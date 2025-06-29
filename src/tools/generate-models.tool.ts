// tools/generate-models.ts
import SequelizeAuto from 'sequelize-auto';
import config from '../config';

const auto = new SequelizeAuto(config.mysql.database || '', config.mysql.user || '', config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql',              // debe ser un string literal compatible
  port: Number(config.mysql.port) || 0,
  directory: './src/models',
  caseModel: 'p',
  caseFile: 'c',
  lang: 'ts',
  additional: { timestamps: false, },
  singularize: true,             // indica que los modelos se singularizan
  useDefine: true,               // usa `sequelize.define` en vez de modelos con extend
});

auto.run().then(() => {
  console.log('✅ Modelos generados exitosamente.');
}).catch((err) => {
  console.error('❌ Error generando modelos:', err);
});

// para ejecutarlo es de esta manera 
// npx ts-node src/tools/generate-models.tool.ts