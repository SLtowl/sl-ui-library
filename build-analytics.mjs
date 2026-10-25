import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {configurationReady} from './plugins/sl-ui-library/scripts/analytics-core.mjs';
try {process.loadEnvFile?.(new URL('./.env.local',import.meta.url));} catch(error) {if(error.code!=='ENOENT')throw error;}
export async function buildAnalytics() {
 const {version}=JSON.parse(await readFile(new URL('./package.json',import.meta.url),'utf8'));
 const config={enabled:process.env.SL_ANALYTICS_ENABLED==='true',privacyVerified:process.env.SL_ANALYTICS_PRIVACY_VERIFIED==='true',
  projectId:Number(process.env.POSTHOG_PROJECT_ID),projectToken:process.env.POSTHOG_PROJECT_TOKEN??'',
  apiHost:process.env.POSTHOG_API_HOST??'',version,environment:process.env.SL_ANALYTICS_ENVIRONMENT??'production'};
 if(config.enabled&&!configurationReady(config))throw new Error('Analytics configuration is incomplete or unsafe. Only a public project token and approved ingestion host are accepted.');
 const output=configurationReady(config)?config:{enabled:false};
 const publicRoot=new URL('./public/analytics/',import.meta.url);
 await mkdir(publicRoot,{recursive:true});
 await mkdir(new URL('./plugins/sl-ui-library/assets/',import.meta.url),{recursive:true});
 await writeFile(new URL('config.json',publicRoot),JSON.stringify(output)+'\n');
 await writeFile(new URL('./plugins/sl-ui-library/assets/analytics-config.json',import.meta.url),JSON.stringify(output)+'\n');
 await writeFile(new URL('analytics-core.mjs',publicRoot),await readFile(new URL('./plugins/sl-ui-library/scripts/analytics-core.mjs',import.meta.url)));
}
