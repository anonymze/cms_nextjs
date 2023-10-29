import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export default  sqliteTable('upload', {
  id: integer('id').primaryKey(),  // 'id' is the column name
  filename: text('filename'),
});