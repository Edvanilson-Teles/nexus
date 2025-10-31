import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ResultService } from '../services/result.service';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { ValidateResultDto } from '../dto/validate-result.dto';

@ApiTags('results')
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new result' })
  @ApiResponse({ status: 201, description: 'Result created successfully' })
  @ApiResponse({ status: 404, description: 'Sample or Test not found' })
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all results with optional filters' })
  @ApiResponse({ status: 200, description: 'Results retrieved successfully' })
  @ApiQuery({ name: 'sampleId', required: false, type: Number })
  @ApiQuery({ name: 'testId', required: false, type: Number })
  @ApiQuery({ name: 'companyId', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'flag', required: false, type: String })
  findAll(
    @Query('sampleId') sampleId?: number,
    @Query('testId') testId?: number,
    @Query('companyId') companyId?: number,
    @Query('status') status?: string,
    @Query('flag') flag?: string,
  ) {
    return this.resultService.findAll({
      sampleId: sampleId ? +sampleId : undefined,
      testId: testId ? +testId : undefined,
      companyId: companyId ? +companyId : undefined,
      status,
      flag,
    });
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get all results for a specific patient' })
  @ApiResponse({ status: 200, description: 'Patient results retrieved successfully' })
  findByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.resultService.findByPatient(patientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific result by ID' })
  @ApiResponse({ status: 200, description: 'Result retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resultService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a result' })
  @ApiResponse({ status: 200, description: 'Result updated successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 400, description: 'Cannot update released result' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResultDto: UpdateResultDto,
  ) {
    return this.resultService.update(id, updateResultDto);
  }

  @Patch(':id/validate')
  @ApiOperation({ summary: 'Validate a result' })
  @ApiResponse({ status: 200, description: 'Result validated successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 400, description: 'Cannot validate released result' })
  validate(
    @Param('id', ParseIntPipe) id: number,
    @Body() validateDto: ValidateResultDto,
  ) {
    return this.resultService.validate(id, validateDto);
  }

  @Patch(':id/release')
  @ApiOperation({ summary: 'Release a validated result' })
  @ApiResponse({ status: 200, description: 'Result released successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 400, description: 'Result must be validated before release' })
  release(
    @Param('id', ParseIntPipe) id: number,
    @Body('reviewedBy', ParseIntPipe) reviewedBy: number,
  ) {
    return this.resultService.release(id, reviewedBy);
  }

  @Post(':id/correct')
  @ApiOperation({ summary: 'Create a correction for a result' })
  @ApiResponse({ status: 201, description: 'Correction created successfully' })
  @ApiResponse({ status: 404, description: 'Original result not found' })
  createCorrection(
    @Param('id', ParseIntPipe) id: number,
    @Body() correctionDto: CreateResultDto & { correctionReason: string },
  ) {
    const { correctionReason, ...resultDto } = correctionDto;
    return this.resultService.createCorrection(id, resultDto, correctionReason);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a result' })
  @ApiResponse({ status: 200, description: 'Result deleted successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 400, description: 'Cannot delete released result' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resultService.delete(id);
  }
}
