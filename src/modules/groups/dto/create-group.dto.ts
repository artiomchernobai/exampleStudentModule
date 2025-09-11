import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGroupDto {
    @ApiProperty({ example: 'Group ID:', description: 'The ID of the group'})
    @IsString()
    id: number;

    @ApiProperty({ example: 'Group Name:', description: 'The name of the group'})
    @IsString()
    name: string;
}