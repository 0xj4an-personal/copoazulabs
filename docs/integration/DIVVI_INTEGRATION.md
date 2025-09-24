# Divvi Integration

This application has been integrated with [Divvi](https://divvi.xyz), a referral tracking system for blockchain applications.

## What is Divvi?

Divvi is a referral tracking system that allows users to earn rewards for their blockchain transactions. When users make transactions through your dapp, they can earn referral rewards that are tracked and distributed automatically.

## Integration Details

### Consumer Address
- **Address**: `your_divvi_consumer_address` (configured via environment variable)
- **Network**: Celo Mainnet
- **Explorer**: [View on Celoscan](https://celoscan.io/address/your_divvi_consumer_address)

### How It Works

1. **Referral Tag Generation**: When a user makes a transaction, a unique referral tag is generated using their wallet address and our consumer address.

2. **Transaction Modification**: The referral tag is appended to the transaction data, enabling Divvi to track the referral.

3. **Automatic Submission**: After the transaction is confirmed, it's automatically submitted to Divvi for reward calculation.

4. **Reward Distribution**: Divvi handles the reward distribution process automatically.

### Implementation

The integration is implemented through:

- **`useDivvi` Hook**: Manages referral tag generation and submission
- **`DivviStatus` Component**: Shows users the referral tracking status
- **Modified Payment Flow**: All cCOP payments now include referral tracking

### Files Modified

- `src/hooks/useDivvi.ts` - Divvi integration hook
- `src/components/DivviStatus.tsx` - Status display component
- `src/hooks/usePayment.ts` - Modified to include referral tags
- `src/app/[locale]/checkout/page.tsx` - Added Divvi status display
- `src/messages/en.json` & `src/messages/es.json` - Added translations

### Benefits

- **User Rewards**: Users earn rewards for transactions made through the dapp
- **Automatic Tracking**: No manual intervention required
- **Transparent**: Users can see their referral status
- **Non-intrusive**: Referral tracking doesn't affect the user experience

### Verification

You can verify that referrals are being tracked by:

1. Making a transaction through the dapp
2. Checking the transaction on Celoscan
3. Looking for "ReferralRegistered" events in the DivviRegistry contract
4. Using the [Divvi verification tool](https://divvi.xyz/verify)

## Technical Notes

- The integration uses the `@divvi/referral-sdk` v2
- Referral tags are generated client-side for privacy
- Failed referral submissions don't break the payment flow
- The integration is compatible with the existing Wagmi/Viem setup

## Support

For questions about Divvi integration:
- [Divvi Documentation](https://docs.divvi.xyz)
- [Divvi SDK Repository](https://github.com/divvi-xyz/divvi-referral-sdk)
- [Divvi MCP Server](https://github.com/divvi-xyz/divvi-mcp-server)
