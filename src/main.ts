import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomExceptionFilter } from '@system/exception';
import { AppConfigService } from '@system/service';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );

    const builder = new DocumentBuilder()
        .setTitle('Open API - Sekolah')
        .setDescription('<p style="line-height: 25px;"><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>')
        .setVersion('1.0')
        .setContact('MandaWeb', 'http://www.manda.web.id', 'bramanda48@gmail.com')
        .addBearerAuth({in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT'}, 'Authorization',)
        .build();
    
    //Define swagger instance
    const document = SwaggerModule.createDocument(app, builder);
    SwaggerModule.setup('/', app, document);
    
    //Define pipe
    app.useGlobalPipes(new ValidationPipe({
		exceptionFactory: (error: ValidationError[] = []) => {
			const message: string[] = Object.values(error[0].constraints);
			return new BadRequestException(message[0]);
		},
	}));

    //Define exception filter
    app.useGlobalFilters(new CustomExceptionFilter());
    
    //Define config
    const config = app.get(AppConfigService);

    await app.listen(config.app_port);
}
bootstrap();
