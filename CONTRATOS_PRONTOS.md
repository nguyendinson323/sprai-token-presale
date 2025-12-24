# Smart Contracts - Concluído ✅

## Contratos Implantados (BSC Testnet)

### Token SPRAI
- **Endereço:** `0x59231E585A29a5235CafB796eedC2c3AeB585ddA`
- **Verificado:** [Ver no BscScan](https://testnet.bscscan.com/address/0x59231E585A29a5235CafB796eedC2c3AeB585ddA#code)
- **Supply:** 2.000.000 SPRAI criados na sua carteira
- **Owner:** Você (`0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311`)

### Contrato de Presale
- **Endereço:** `0xBa38A346FC22cCbd89375389D8C5ba1170AF31bC`
- **Verificado:** [Ver no BscScan](https://testnet.bscscan.com/address/0xBa38A346FC22cCbd89375389D8C5ba1170AF31bC#code)
- **Preço:** 0.20 USDT por SPRAI
- **Limites:** Min 10 USDT / Max 10.000 USDT
- **Owner:** Você

## O Que Foi Entregue

✅ **Contratos novos** - Projeto limpo, zero relação com o antigo 0x7C7e...
✅ **Distribuição automática** - Cliente paga USDT → recebe SPRAI instantaneamente
✅ **Código verificado** - Público no BscScan, totalmente auditável
✅ **Você é o owner** - Controle total de ambos os contratos
✅ **Configuração via .env** - Sem valores fixos no código

## Próximo Passo (Você Deve Fazer)

Para ativar a distribuição automática, você precisa aprovar os tokens SPRAI para o contrato de Presale gastar.

**Como fazer:**

1. Acesse: https://testnet.bscscan.com/address/0x59231E585A29a5235CafB796eedC2c3AeB585ddA#writeContract
2. Clique no botão **"Connect Wallet"** no topo da página
3. Selecione **"MetaMask"** ou **"WalletConnect"** (para Trust Wallet)
4. Conecte sua carteira
5. Role a página e encontre a função **`approve`** (item 1)
6. Preencha os campos:
   - `spender (address)`: `0xBa38A346FC22cCbd89375389D8C5ba1170AF31bC`
   - `value (uint256)`: `500000000000000000000000`
7. Clique **"Write"** e confirme a transação na sua carteira

**Pronto!** Depois dessa aprovação, a presale funciona 100% automática.

## Como Funciona

1. Cliente acessa seu site
2. Conecta carteira e escolhe valor em USDT
3. Paga USDT → **recebe SPRAI automaticamente**
4. Você não precisa fazer nada manualmente

## Implantação na Mainnet

Quando estiver tudo testado e aprovado na testnet:

1. Edite `contracts/.env` e mude `NETWORK=bsc_testnet` para `NETWORK=bsc_mainnet`
2. Execute `npm run deploy:mainnet`
3. Copie os novos endereços dos contratos
4. Faça o approve novamente na mainnet
5. Pronto para produção!

---

**Código-fonte completo e instruções detalhadas em:** `GUIA_DE_IMPLANTACAO.md`
