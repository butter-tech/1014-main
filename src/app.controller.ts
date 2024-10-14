import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  getHello() {
    return {
      errors: [],
      data: {}
    };
  }

  @Post('book')
  async handleBooking(
    @Body() body: { name: string; email: string; date: string; guests: string },
    @Res() res: Response
  ) {
    const errors = this.validateForm(body);

    if (errors.length > 0) {
      return res.render('index', { errors, data: body });
    } else {
      return res.redirect('/success');
    }
  }

  @Get('success')
  @Render('success')
  getSuccess() {
    return {};
  }

  private validateForm(formData: { name: string; email: string; date: string; guests: string }) {
    const errors: { param: string; msg: string }[] = [];
    const { name, email, date, guests } = formData;

    if (!name) errors.push({ param: 'name', msg: 'Név kötelező' });
    if (!email || !email.includes('@')) errors.push({ param: 'email', msg: 'Érvénytelen e-mail cím' });
    if (!date || new Date(date) <= new Date()) errors.push({ param: 'date', msg: 'A dátumnak a jövőbeli időpontnak kell lennie' });
    if (!guests || isNaN(Number(guests)) || Number(guests) < 1 || Number(guests) > 10) errors.push({ param: 'guests', msg: 'A vendégek száma 1 és 10 között kell legyen' });

    return errors;
  }
}
