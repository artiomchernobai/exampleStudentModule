import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateGroupDto {
    @ApiProperty({ example: 'New Group ID:', description: 'The ID of the new group' })
    @IsString()
    id: number;

    @ApiProperty({ example: 'New Group Name:', description: 'The name of the new group' })
    @IsString()
    name: string;
}