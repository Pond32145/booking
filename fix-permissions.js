#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to make a file executable
function makeExecutable(filePath) {
  try {
    fs.chmodSync(filePath, 0o755);
    console.log(`Made ${filePath} executable`);
  } catch (error) {
    console.error(`Failed to make ${filePath} executable:`, error.message);
  }
}

// Function to fix permissions for common build tools
function fixPermissions() {
  const nodeModulesBin = path.join(__dirname, 'node_modules', '.bin');
  
  if (fs.existsSync(nodeModulesBin)) {
    console.log('Fixing permissions in node_modules/.bin...');
    
    try {
      const files = fs.readdirSync(nodeModulesBin);
      
      files.forEach(file => {
        const filePath = path.join(nodeModulesBin, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile()) {
          makeExecutable(filePath);
        }
      });
    } catch (error) {
      console.error('Error reading node_modules/.bin:', error.message);
    }
  } else {
    console.log('node_modules/.bin directory not found');
  }
  
  // Also try to fix permissions for TypeScript and Vite specifically
  const tscPath = path.join(__dirname, 'node_modules', 'typescript', 'bin', 'tsc');
  if (fs.existsSync(tscPath)) {
    makeExecutable(tscPath);
  }
  
  const vitePath = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
  if (fs.existsSync(vitePath)) {
    makeExecutable(vitePath);
  }
  
  console.log('Permission fix attempt completed');
}

// Run the fix
fixPermissions();