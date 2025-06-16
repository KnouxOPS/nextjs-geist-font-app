import type { NextApiRequest, NextApiResponse } from 'next';
import { scanProject } from '../../src/projectScanner.js';
import { analyzeCode } from '../../src/codeAnalyzer.js';
import { generateReport } from '../../src/reportGenerator.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const projectPath = process.cwd();
    const scanResults = await scanProject(projectPath);
    const analysisResults = await analyzeCode(scanResults);
    const reportPath = await generateReport(analysisResults);

    res.status(200).json({ reportPath });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
