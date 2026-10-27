// This file demonstrates various security vulnerabilities for educational purposes
// DO NOT USE IN PRODUCTION

const _ = require('lodash');
const minimist = require('minimist');
const handlebars = require('handlebars');
const moment = require('moment');
const forge = require('node-forge');

console.log('🚨 Security Vulnerability Demonstration 🚨');
console.log('This application contains intentionally vulnerable packages for GitHub Advanced Security testing\n');

// 1. Lodash Prototype Pollution Vulnerability (CVE-2019-10744)
console.log('1. Lodash Version:', _.VERSION);
console.log('   - Known for prototype pollution vulnerabilities in versions <= 4.17.20');
console.log('   - Can be exploited via functions like _.merge(), _.mergeWith(), _.defaults(), etc.\n');

// 2. Minimist Prototype Pollution (CVE-2020-7598)
console.log('2. Minimist Prototype Pollution Demo:');
try {
    const args = minimist(['--__proto__.polluted=true']);
    console.log('   - Argument parsing result:', args);
    console.log('   - Prototype pollution check:', ({}).polluted); // Should be undefined in safe versions
} catch (e) {
    console.log('   - Error:', e.message);
}
console.log('');

// 3. Handlebars Template Injection (CVE-2021-23369)
console.log('3. Handlebars Version:', handlebars.VERSION);
console.log('   - Vulnerable to remote code execution in versions <= 4.7.6');
console.log('   - Can execute arbitrary code through template compilation\n');

// 4. Moment.js ReDoS Vulnerability
console.log('4. Moment.js Version:', moment.version);
console.log('   - Vulnerable to Regular Expression Denial of Service');
console.log('   - Current date:', moment().format('YYYY-MM-DD HH:mm:ss'));
console.log('   - Known path traversal issues in locale functionality\n');

// 5. Node-forge Vulnerabilities
console.log('5. Node-forge Cryptographic Issues:');
console.log('   - Multiple signature verification vulnerabilities');
console.log('   - Prototype pollution in debug API');
console.log('   - URL parsing vulnerabilities\n');

// 6. Other vulnerable packages info
console.log('6. Additional Vulnerable Packages:');
console.log('   - ws: WebSocket library with DoS vulnerabilities');
console.log('   - tar: Archive extraction with path traversal issues');
console.log('   - marked: Markdown parser with ReDoS vulnerabilities');
console.log('   - serialize-javascript: Code injection possibilities');
console.log('   - yargs-parser: Prototype pollution vulnerabilities\n');

console.log('📋 Summary of Vulnerabilities:');
console.log('   - 2 Critical severity vulnerabilities');
console.log('   - 6 High severity vulnerabilities'); 
console.log('   - 1 Moderate severity vulnerability');
console.log('   - 1 Low severity vulnerability');
console.log('\n🔧 These vulnerabilities should be detected by:');
console.log('   - npm audit');
console.log('   - GitHub Dependabot alerts');
console.log('   - GitHub Advanced Security (GHAS)');
console.log('   - Snyk and other security scanners');