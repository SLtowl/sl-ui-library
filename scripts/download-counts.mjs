import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
export async function downloadCounts({token=process.env.GH_TOKEN,fetcher=fetch}={}){
 if(!token)throw new Error('Set GH_TOKEN in your local environment to a repository Contents:read credential. Never paste it into a file or chat.');
 const get=async path=>{
  const response=await fetcher(`https://api.github.com/repos/SLtowl/sl-ui-library/${path}`,{headers:{Accept:'application/vnd.github+json',Authorization:`Bearer ${token}`,'X-GitHub-Api-Version':'2026-03-10'},redirect:'error',signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error(`GitHub returned ${response.status}. No credential was printed or stored.`);
  return response.json();
 };
 const assets=[];
 for(let page=1;;page++){
  const releases=await get(`releases?per_page=100&page=${page}`);
  if(!Array.isArray(releases))throw new Error('Unexpected release response');
  for(const release of releases)for(let assetPage=1;;assetPage++){
   const items=await get(`releases/${release.id}/assets?per_page=100&page=${assetPage}`);
   if(!Array.isArray(items))throw new Error('Unexpected asset response');
   for(const asset of items)assets.push({release:release.tag_name,name:asset.name,downloads:asset.download_count});
   if(items.length<100)break;
  }
  if(releases.length<100)break;
 }
 return {repository:'SLtowl/sl-ui-library',metric:'GitHub release asset downloads, not unique installs',total:assets.reduce((n,a)=>n+a.downloads,0),assets,telemetry:false};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{console.log(JSON.stringify(await downloadCounts(),null,2));}catch(error){console.error(error.message);process.exitCode=1;}
}
