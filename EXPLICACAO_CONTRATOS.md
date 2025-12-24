# Explicação: Como os Contratos Funcionam

## Resumo Rápido

 Você tem 2.000.000 SPRAI na sua carteira
 Você é owner de tudo
 Dois contratos separados = padrão seguro da indústria

---

## 1. Por Que Dois Contratos?

Contrato Token SPRAI = Fábrica de moedas (só cria tokens)
Contrato Presale = Máquina de venda (só vende tokens)

### Vantagens:
-  Token limpo e simples (sem código de venda embutido)
-  Você pode pausar/modificar presale sem afetar o token
-  Padrão usado por PancakeSwap, Uniswap, etc.
-  Mais seguro e auditável

---

## 2. Onde Estão Seus Tokens?

Todos os 2.000.000 SPRAI estão na sua carteira:
`0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311`

Verificar: https://testnet.bscscan.com/token/0x59231E585A29a5235CafB796eedC2c3AeB585ddA?a=0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311

---

## 3. Como Funciona a Venda Automática?

```
Cliente paga 100 USDT
    ↓
Presale recebe 100 USDT
    ↓
Presale envia 100 USDT → Sua Carteira
    ↓
Presale PEGA 500 SPRAI → Da Sua Carteira (precisa approve!)
    ↓
Presale envia 500 SPRAI → Cliente
```

Sem approve: Presale não consegue pegar SPRAI da sua carteira = Vendas falham

Com approve: Presale pega SPRAI automaticamente = Vendas funcionam

---

## 4. O Que É o "Approve"?

É você dar permissão para o contrato Presale gastar seus tokens.

Exemplo: Igual PancakeSwap pedindo permissão para gastar seus tokens quando você faz swap.

Você aprova uma vez: Presale pode distribuir automaticamente sempre que alguém comprar.

---

## 5. Você É Owner de Tudo?

SIM! Verifique você mesmo:

Token Owner:
https://testnet.bscscan.com/address/0x59231E585A29a5235CafB796eedC2c3AeB585ddA#readContract
- Clique em `owner()` → Retorna `0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311` (você)

Presale Owner:
https://testnet.bscscan.com/address/0xBa38A346FC22cCbd89375389D8C5ba1170AF31bC#readContract
- Clique em `owner()` → Retorna `0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311` (você)

---

## 6. Controle Total

Como owner, você pode:
-  Pausar/despausar presale
-  Mudar preço do token
-  Mudar limites min/max
-  Transferir ownership
-  Tudo fica sob seu controle

---

## Conclusão

Arquitetura correta:
- Token = Simples e seguro
- Presale = Separado e controlável
- Você = Owner de tudo
- Padrão = Indústria (PancakeSwap, Uniswap, etc.)

Próximo passo: Fazer o approve para ativar vendas automáticas (instruções em `CONTRATOS_PRONTOS.md`)
