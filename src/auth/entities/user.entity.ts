/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', { unique: true })
  email: string;

  @ApiProperty()
  @Column('text', { select: false })
  password: string;

  @ApiProperty()
  @Column('text')
  fullName: string;

  @ApiProperty()
  @Column('bool', { default: true })
  isActive: boolean;

  @ApiProperty()
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  //Example: Relation table Product
  // @OneToMany(
  //   () => Product,
  //   ( product ) => product.user
  // )
  // product: Product;

  @BeforeInsert()
  checkFiledsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }
  @BeforeInsert()
  checkFiledsBeforeUpdate() {
    this.checkFiledsBeforeInsert();
  }
}
