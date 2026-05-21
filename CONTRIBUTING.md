# Contributing to SMART-CAO

We welcome contributions from developers, designers, and community members! This document outlines how to get involved.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/SMART-CAO.git`
3. **Create** a branch: `git checkout -b feature/your-feature`
4. **Make** your changes
5. **Commit**: `git commit -m "feat: add new feature"`
6. **Push**: `git push origin feature/your-feature`
7. **Open** a Pull Request

## Code Standards

### Naming Conventions
- **Files**: kebab-case (`hub-operacional.tsx`)
- **Components**: PascalCase (`HubOperacional`)
- **Functions**: camelCase (`fetchMetrics`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)

### Frontend (React + TypeScript)
```typescript
// Good
interface TokenMetadata {
  tokenId: number
  farmerId: string
  validated: boolean
}

const HubOperacional: React.FC = () => {
  const [tokens, setTokens] = useState<TokenMetadata[]>([])
  return <div>...</div>
}

export default HubOperacional
```

### Backend (Express + TypeScript)
```typescript
// Good
interface CreateTokenRequest {
  farmerId: string
  areaId: string
  carbonCredit: number
}

app.post('/tokens', async (req: Request, res: Response) => {
  const { farmerId, areaId, carbonCredit } = req.body as CreateTokenRequest
  // Implementation
})
```

### Smart Contracts (Solidity)
```solidity
// Good
function mintToken(
    address to,
    string memory farmerId,
    uint256 area
) public onlyOwner returns (uint256) {
    // Implementation
    emit TokenMinted(tokenId, farmerId, area);
}
```

## Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build, dependencies

**Example**:
```
feat(hub): add circuit breaker functionality

Add emergency stop button to hub operacional
- Implement circuit breaker logic
- Add visual indicators
- Store state in Redis

Closes #42
```

## Pull Request Process

1. **Description**: Clear description of changes
2. **Linked Issues**: Reference related issues
3. **Tests**: Add or update tests
4. **Documentation**: Update docs if needed
5. **Screenshots**: Add if UI changes
6. **Review**: Request reviewers

### PR Title Format
```
[TYPE] Brief description

Example: [feat] Add circuit breaker to hub operacional
```

## Testing

### Frontend Tests
```bash
cd frontend
npm run test
npm run test:coverage
```

### Backend Tests
```bash
cd backend
npm run test
npm run test:coverage
```

### Contract Tests
```bash
cd blockchain
npm run test
npm run test:coverage
```

## Documentation

- Update README.md for major changes
- Add JSDoc comments to functions
- Include example usage in docstrings
- Update API documentation in docs/

### Example JSDoc
```typescript
/**
 * Validates a cabruca token against satellite imagery
 * @param tokenId - The token ID to validate
 * @param visionResult - Result from Vision API
 * @returns Promise<ValidationResult>
 */
function validateToken(
  tokenId: number,
  visionResult: VisionResult
): Promise<ValidationResult> {
  // Implementation
}
```

## Code Review Guidelines

### Reviewers Check For:
- ✅ Code follows standards
- ✅ Tests are included
- ✅ Documentation is updated
- ✅ No breaking changes
- ✅ Performance impact
- ✅ Security implications

### Reviewee Responds To:
- Address all comments
- Commit changes on same branch
- Explain decisions
- Request re-review

## Reporting Issues

### Bug Reports
```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- OS: [e.g., Ubuntu 22.04]
- Node: [e.g., 18.0.0]
- Browser: [if frontend]
```

### Feature Requests
```markdown
## Feature Description
[Clear description of feature]

## Use Case
[Why is this needed?]

## Proposed Implementation
[How you think it should work]

## Additional Context
[Any other info]
```

## Development Tips

### Local Setup
```bash
# Install all dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your settings

# Run tests
npm run test

# Start development
npm run dev
```

### Debugging
```bash
# Backend with debugging
node --inspect-brk ./dist/index.js

# Frontend with React DevTools
# Install React Developer Tools extension

# Smart contracts
npx hardhat run scripts/debug.ts --network hardhat
```

### Performance
- Use React DevTools Profiler
- Check backend response times
- Monitor gas usage in contracts
- Use lighthouse for frontend audits

## Code of Conduct

- Be respectful and inclusive
- No harassment or discrimination
- Focus on code, not person
- Help others learn
- Report violations to maintainers

## Questions?

- 💬 Join our Discord: [link]
- 📧 Email: contact@smartcao.com
- 📝 GitHub Discussions: [link]

---

**Thank you for contributing! 🌱**
