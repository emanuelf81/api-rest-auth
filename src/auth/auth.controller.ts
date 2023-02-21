import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: User })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ type: User })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  //Custom Decorator Authentication.
  //Example without roles = @Auth() //Check JWT of User.
  //Example with roles = @Auth(ValidRoles.admin, ValidRoles.superUser) //Check JWT of User and roles.
  @Auth()
  @ApiBody({ type: User })
  @ApiResponse({ type: User })
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkStatus(user);
  }

  @Get('users')
  //Custom Decorator Authentication.
  //Example without roles = @Auth() //Check JWT of User.
  //Example with roles = @Auth(ValidRoles.admin, ValidRoles.superUser) //Check JWT of User and roles.
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @ApiResponse({ type: User })
  findAllUser(@GetUser() user: User) {
    return this.authService.findAllUsers();
  }

  @Put(':id')
  @Auth()
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.update(id, updateUserDto);
  }
}
