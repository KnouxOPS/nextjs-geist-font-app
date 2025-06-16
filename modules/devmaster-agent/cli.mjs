import readline from 'readline';
import { spawn } from 'child_process';

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Choose an option:\n1. Run scan\n2. Open GUI\nEnter choice (1 or 2): ', async (answer) => {
    if (answer === '1') {
      const { scanProject } = await import('./src/projectScanner.js');
      const { analyzeCode } = await import('./src/codeAnalyzer.js');
      const { generateReport } = await import('./src/reportGenerator.js');

      const projectPath = process.argv[2] || '.';

      console.log(`Starting DevMaster Agent scan on: \${projectPath}`);

      const scanResults = await scanProject(projectPath);
      const analysisResults = await analyzeCode(scanResults);
      const reportPath = await generateReport(analysisResults);

      console.log('Scan and analysis complete. Report generated:');
      console.log(reportPath);

      const open = (await import('open')).default;
      await open(reportPath);
    } else if (answer === '2') {
      console.log('Starting GUI server...');
      const serverProcess = spawn('node', ['--loader', 'ts-node/esm', './gui/server.ts'], {
        stdio: 'inherit'
      });
      serverProcess.on('error', (err) => {
        console.error('Failed to start GUI server:', err);
      });
      const open = (await import('open')).default;
      await open('http://localhost:8000');
    } else {
      console.log('Invalid choice. Exiting.');
    }
    rl.close();
  });
}

main().catch(err => {
  console.error('Error running DevMaster Agent:', err);
  process.exit(1);
});
