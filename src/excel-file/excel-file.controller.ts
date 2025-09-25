import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExcelFileService } from './interface/excel-file.interface';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { ExcelUploadInterceptor } from '../common/interseptors/fileUpload';
import { promises as fs } from 'fs';
import { read, utils } from 'xlsx';
import {
  CreateManyPhoneNumbersRequest,
  CreateManyPhoneNumbersResponse,
  PhoneNumberServiceClient,
} from './interface/phone-number.interface';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Controller('excel-file')
export class ExcelFileController {
  private excelFileService: ExcelFileService;
  private phoneNumberService: PhoneNumberServiceClient;

  constructor(@Inject('FILE_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.excelFileService =
      this.client.getService<ExcelFileService>('ExcelFileService');

    this.phoneNumberService =
      this.client.getService<PhoneNumberServiceClient>('PhoneNumberService');
  }

  @Post('upload/:userId')
  @UseInterceptors(ExcelUploadInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({ summary: 'Excel faylni yuklash' })
  @ApiResponse({ status: 201, description: 'Fayl muvaffaqiyatli yuklandi' })
  async uploadExcel(
    @UploadedFile() file: any,
    @Param('userId') userId: string,
  ) {
    // 1. Excel faylni parse qilish
    const json = await this.parseExcelFile(file.path);

    // 2. Excel fayl haqida yozuv yaratish
    const newExcelFile = await this.saveExcelFileMeta(
      file,
      userId,
      json.length,
    );

    // 3. Phone numberlar arrayini tayyorlash
    const phoneNumbers = this.preparePhoneNumbers(json, newExcelFile!.id);

    // 4. Ularni boshqa servicega yuborish
    await this.createMany({ phoneNumbers });

    return newExcelFile;
  }

  private async parseExcelFile(path: string) {
    const fileBuffer = await fs.readFile(path);
    const workbook = read(fileBuffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return utils.sheet_to_json(sheet);
  }

  private async saveExcelFileMeta(
    file: any,
    userId: string,
    totalNumbers: number,
  ) {
    return await this.excelFileService
      .Create({
        userId: parseInt(userId, 10),
        fileName: file.filename,
        originalName: Buffer.from(file.originalname, 'latin1').toString('utf8'), //kirilcha nomlar uchun
        filePath: file.path,
        fileSize: file.size,
        totalNumbers,
      })
      .toPromise();
  }

  private preparePhoneNumbers(json: any[], excelFileId: number) {
    return json.map((item, index) => {
      const phoneInfo = this.getCountryInfo(String(item['Raqam']) || '', 'UZ');
      return {
        excelFileId,
        phoneNumber: item['Raqam'] || '',
        fullname: item['Ism'] || '',
        countryCode: phoneInfo?.callingCode || '',
        additionalInfo: item['Info'] || '',
        rowNumber: index + 1,
        isValid: phoneInfo?.isValid ?? false,
      };
    });
  }

  async createMany(
    @Body() body: CreateManyPhoneNumbersRequest,
  ): Promise<CreateManyPhoneNumbersResponse> {
    return await lastValueFrom(this.phoneNumberService.createMany(body));
  }

  getCountryInfo(raw: string, defaultCountry: string) {
    const phoneNumber = parsePhoneNumberFromString(raw, defaultCountry as any);
    if (!phoneNumber) {
      return {
        isValid: false,
        callingCode: '',
        e164: '',
        country: '',
      };
    }

    return {
      isValid: phoneNumber.isValid(),
      callingCode: phoneNumber.countryCallingCode || '',
      e164: phoneNumber.number || '',
      country: phoneNumber.country || '',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Barcha Excel fayllarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Excel fayllar muvaffaqiyatli olindi',
  })
  async findAll() {
    const response = await lastValueFrom(this.excelFileService.FindAll({}));
    return response.items;
  }


  @Get(":id")
  @ApiOperation({ summary: 'Bitta Excel faylni olish' })
  @ApiResponse({
    status: 200,
    description: 'Excel fayl muvaffaqiyatli olindi',
  })
  async findOne(@Param('id') id: string) {
    const response = await lastValueFrom(this.excelFileService.FindOne({ id: +id }));
    return response;
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Bitta Excel faylni o\'chirish' })
  @ApiResponse({
    status: 200,
    description: 'Excel fayl muvaffaqiyatli o\'chirildi',
  })
  async remove(@Param('id') id: string) {
    const response = await lastValueFrom(this.excelFileService.Remove({ id: +id }));
    return response;
  } 
}
