import { useRef, useEffect } from 'react';

const CodeBackground = ({ className = '', opacity = 0.1, speed = 20 }) => {
  const containerRef = useRef(null);

  const codeLines = [
    'import { useState, useEffect } from "react";',
    'const [isSecure, setIsSecure] = useState(false);',
    'function encryptData(payload) {',
    '  const cipher = AES.encrypt(payload, secretKey);',
    '  return cipher.toString();',
    '}',
    'if (threat.detected) {',
    '  initiateLockdown();',
    '  logSecurityEvent("INTRUSION_DETECTED");',
    '}',
    'const firewall = new SecurityFirewall({',
    '  rules: SECURITY_RULES,',
    '  mode: "STRICT"',
    '});',
    'async function scanForVulnerabilities() {',
    '  const results = await scanner.deepScan();',
    '  return results.filter(vuln => vuln.severity > 7);',
    '}',
    'process.env.NODE_ENV === "production" &&',
    '  enableAdvancedThreatProtection();',
    'const hash = crypto.createHash("sha256")',
    '  .update(password + salt)',
    '  .digest("hex");',
    'if (!isAuthorized(user.permissions)) {',
    '  throw new UnauthorizedError("Access denied");',
    '}',
    'logger.warn("Suspicious activity detected:", {',
    '  ip: request.ip,',
    '  timestamp: Date.now(),',
    '  userAgent: request.headers["user-agent"]',
    '});',
    'const jwt = require("jsonwebtoken");',
    'const token = jwt.sign(payload, JWT_SECRET);',
    'sudo iptables -A INPUT -s $BLOCKED_IP -j DROP',
    'nmap -sS -O target_system',
    'grep -r "password" /var/log/',
    'curl -H "Authorization: Bearer $TOKEN" api/secure',
    'openssl genrsa -out private.key 2048',
    'fail2ban-client status sshd',
    'tcpdump -i eth0 -n | grep "suspicious"',
    'SELECT * FROM users WHERE role = "admin";',
    'UPDATE security_logs SET status = "REVIEWED";',
    'INSERT INTO threats (ip, type) VALUES ($ip, $type);',
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create multiple floating code lines
    const createCodeLine = () => {
      const line = document.createElement('div');
      line.className = 'code-line';
      line.textContent = codeLines[Math.floor(Math.random() * codeLines.length)];
      
      line.style.cssText = `
        position: absolute;
        font-family: 'JetBrains Mono', monospace;
        font-size: ${Math.random() * 8 + 10}px;
        color: rgba(0, 255, 65, ${Math.random() * 0.3 + 0.1});
        white-space: nowrap;
        pointer-events: none;
        right: -100%;
        top: ${Math.random() * 100}%;
        transform: translateY(-50%);
        animation: code-scroll ${15 + Math.random() * 10}s linear infinite;
        z-index: -1;
      `;

      container.appendChild(line);

      // Remove line after animation
      setTimeout(() => {
        if (line.parentNode) {
          line.parentNode.removeChild(line);
        }
      }, 25000);
    };

    // Create initial lines
    for (let i = 0; i < 8; i++) {
      setTimeout(createCodeLine, i * 2000);
    }

    // Continuously create new lines
    const interval = setInterval(createCodeLine, 3000);

    return () => {
      clearInterval(interval);
      // Clean up existing lines
      const lines = container.querySelectorAll('.code-line');
      lines.forEach(line => line.remove());
    };
  }, [speed]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity, zIndex: -1 }}
    />
  );
};

export default CodeBackground;