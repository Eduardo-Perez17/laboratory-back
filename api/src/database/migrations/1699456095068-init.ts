import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699456095068 implements MigrationInterface {
    name = 'Init1699456095068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` timestamp(6) NULL, \`firstname\` varchar(10) NOT NULL DEFAULT '', \`lastname\` varchar(10) NOT NULL DEFAULT '', \`email\` varchar(255) NULL, \`password\` varchar(255) NULL, \`role\` enum ('SUPERADMIN', 'ADMIN', 'EMPLOYEE') NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
