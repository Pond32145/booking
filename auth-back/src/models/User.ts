import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @IsNotEmpty()
  username!: string;

  @Column({ type: 'varchar', length: 255 })
  @MinLength(6)
  password!: string;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  provider!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  providerId!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  verificationToken!: string;

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}