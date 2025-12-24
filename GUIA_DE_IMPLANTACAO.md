# Guia de Implantação de Smart Contract

## Pré-requisitos

### 1. Configuração da Carteira
- Carteira **Trust Wallet** ou **MetaMask** instalada
- **Exportar chave privada:**
  - **Trust Wallet**: Abrir carteira > Configurações > Gerenciar carteiras > Selecionar carteira > Ver chave privada
  - **MetaMask**: Configurações > Segurança e Privacidade > Mostrar Chave Privada
- Adicione a chave privada em `contracts/.env` como `DEPLOYER_PRIVATE_KEY`

**Importante:** A carteira precisa estar na rede BSC (Binance Smart Chain) e ter saldo de BNB para pagar as taxas de gas

### 2. Configuração de Rede
- **Testnet**: BSC Testnet
  - RPC: `https://data-seed-prebsc-1-s1.binance.org:8545/`
  - Chain ID: 97
- **Mainnet**: BSC Mainnet
  - RPC: `https://bsc-dataseed.binance.org/`
  - Chain ID: 56

### 3. Saldo Necessário
- **Testnet**: ~0.1 BNB (para testes)
- **Mainnet**: ~0.05-0.1 BNB para pagar taxas de gas da implantação

**Como adicionar BNB na carteira:**
- **Trust Wallet**: Comprar BNB diretamente no aplicativo ou receber de outra carteira
- **MetaMask**: Transferir BNB de exchange (Binance, etc.) para seu endereço MetaMask na rede BSC

## Passos de Implantação

**Antes de começar:**
1. Certifique-se de ter Node.js instalado (versão 16 ou superior)
2. Abra o terminal/prompt de comando
3. Navegue até a pasta do projeto

### Implantação na Testnet

1. **Instalar dependências (primeira vez apenas)**
   ```bash
   cd contracts
   npm install
   ```

2. **Configurar variáveis de ambiente**
   - Edite o arquivo `contracts/.env`
   - Adicione sua chave privada:
     ```
     DEPLOYER_PRIVATE_KEY=SuaChavePrivadaAqui
     ```

3. **Implantar contratos**
   ```bash
   npm run deploy:testnet
   ```
   - Este comando irá compilar e implantar automaticamente os contratos
   - Aguarde alguns minutos para a transação ser confirmada na blockchain

4. **Copiar endereços dos contratos do console**
   - Após a implantação bem-sucedida, você verá no terminal:
   ```
   🎉 DEPLOYMENT COMPLETE!
   ============================================================

   ⚠️  CRITICAL: Update your .env files:
      SPRAI_TOKEN_CONTRACT=0x1234567890abcdef...
      PRESALE_CONTRACT=0xabcdef1234567890...
   ```
   - **Copie ambos os endereços imediatamente** - você precisará deles para configurar o sistema

5. **Atualizar arquivos de configuração**
   - `contracts/.env`:
     ```
     SPRAI_TOKEN_CONTRACT=0xSeuEndereçoSprai
     PRESALE_CONTRACT=0xSeuEndereçoPresale
     ```
   - `backend/.env`:
     ```
     SPRAI_TOKEN_CONTRACT=0xSeuEndereçoSprai
     PRESALE_CONTRACT=0xSeuEndereçoPresale
     ```
   - `frontend/.env`:
     ```
     VITE_SPRAI_TOKEN_CONTRACT=0xSeuEndereçoSprai
     VITE_PRESALE_CONTRACT=0xSeuEndereçoPresale
     ```

### Implantação na Mainnet

**⚠️ ATENÇÃO:** Só faça isso após testar completamente na testnet!

1. **Preparar carteira**
   - Certifique-se de que a carteira tem pelo menos 0.1 BNB na rede BSC Mainnet
   - Verifique o saldo na Trust Wallet ou MetaMask

2. **Atualizar arquivo .env**
   - Edite `contracts/.env`
   - Altere `NETWORK=bsc_testnet` para `NETWORK=bsc_mainnet`

3. **Implantar contratos**
   ```bash
   cd contracts
   npm run deploy:mainnet
   ```
   - **Cuidado:** Esta transação custará BNB real e os contratos ficarão permanentemente na blockchain

4. **Copiar e atualizar** (mesmo que os passos 4-5 da testnet acima)

## Verificação de Contratos (BscScan)

1. **Obter Chave de API do BscScan**
   - Criar conta em [BscScan](https://bscscan.com/) ou [Testnet BscScan](https://testnet.bscscan.com/)
   - Gerar chave de API nas configurações da conta
   - Adicionar em `contracts/.env` como `BSCSCAN_API_KEY`

2. **Verificar contratos**
   - Comandos mostrados na saída do console após a implantação
   ```bash
   cd contracts
   npx hardhat verify --network bscTestnet <ENDEREÇO_SPRAI>
   npx hardhat verify --network bscTestnet <ENDEREÇO_PRESALE> <ARGS...>
   ```

## Onde Encontrar os Endereços dos Contratos

**Saída do Console:** Após a implantação, procure por:

```
🎉 DEPLOYMENT COMPLETE!
============================================================

⚠️  CRITICAL: Update your .env files:
   SPRAI_TOKEN_CONTRACT=0x1234...
   PRESALE_CONTRACT=0x5678...
```

**Esses endereços** precisam ser adicionados em:
1. `contracts/.env` - para verificação
2. `backend/.env` - para API do backend
3. `frontend/.env` - para frontend (com prefixo VITE_)

## Lista de Verificação Pós-Implantação

- [ ] Copiar endereços dos contratos da saída do console
- [ ] Atualizar todos os arquivos .env (contracts, backend, frontend) com os endereços
- [ ] **CRÍTICO:** Proprietário precisa aprovar tokens SPRAI para o contrato de presale
  - Abrir Trust Wallet ou MetaMask
  - Acessar o contrato SPRAI no BscScan
  - Chamar função `approve()` com:
    - Spender: endereço do contrato Presale
    - Amount: `500000000000000000000000` (500,000 tokens)
- [ ] Verificar contratos no BscScan (deixa os contratos públicos e confiáveis)
- [ ] Testar uma compra pequena no site para confirmar que tudo funciona

## Notas Importantes

- **Segurança da chave privada:**
  - Nunca compartilhe sua chave privada com ninguém
  - Nunca commite arquivo `.env` com chaves privadas reais no Git
  - Guarde a chave privada em local seguro (cofre de senhas)

- **Processo de implantação:**
  - **Sempre teste na testnet primeiro** antes de gastar BNB real na mainnet
  - O endereço que implantar os contratos se torna o proprietário (owner)
  - Proprietário tem controle total sobre os contratos

- **Custos:**
  - Testnet: Grátis (BNB de teste)
  - Mainnet: ~0.05-0.1 BNB (varia com preço do gas)

- **Suporte:**
  - Se encontrar erros, verifique:
    - Saldo de BNB suficiente
    - Chave privada correta no .env
    - Rede correta selecionada (testnet/mainnet)
