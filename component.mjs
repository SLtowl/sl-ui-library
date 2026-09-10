import {run} from './plugins/sl-ui-library/scripts/library.mjs';
const [variant,directory]=process.argv.slice(2);
try{
 if(process.argv.length!==4)throw new Error('Usage: node component.mjs <variant> <new-directory>');
 console.log(JSON.stringify(await run(['install',variant,directory]),null,2));
}catch(error){console.error(error.message);process.exitCode=1;}
