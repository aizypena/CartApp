import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

function Row({ label, value, valueClassName = 'text-ink' }) {
  return (
    <View className="flex-row justify-between mb-2">
      <Text className="text-sm text-body">{label}</Text>
      <Text className={`text-sm font-medium ${valueClassName}`}>{value}</Text>
    </View>
  );
}

export default function OrderSummary() {
  const {
    totalItemCount,
    subtotal,
    discountAmount,
    finalTotal,
    voucherCode,
    setVoucherCode,
    appliedVoucher,
    voucherError,
    applyVoucher,
    removeVoucher,
  } = useCart();

  const canApply = voucherCode.trim().length > 0;

  return (
    <View className="bg-surface p-5 rounded-2xl border border-line">
      <Text className="text-base font-semibold text-ink mb-4">Order summary</Text>

      {/* VOUCHER: applied state or input */}
      {appliedVoucher ? (
        <View className="bg-accent-soft px-4 py-3 rounded-xl mb-4 flex-row justify-between items-center">
          <View className="flex-1 mr-3">
            <Text className="text-xs text-accent font-semibold uppercase tracking-wider">
              Voucher applied
            </Text>
            <Text className="text-sm text-ink mt-0.5">
              {appliedVoucher.code} · {appliedVoucher.label}
            </Text>
          </View>
          <TouchableOpacity onPress={removeVoucher} activeOpacity={0.6} className="py-1">
            <Text className="text-xs font-medium text-body underline">Remove</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="mb-4">
          <Text className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
            Voucher code
          </Text>
          <View className="flex-row">
            <TextInput
              className={`flex-1 bg-canvas border rounded-xl px-4 py-3 text-ink text-sm mr-2 ${
                voucherError ? 'border-danger' : 'border-line'
              }`}
              placeholder="Enter code"
              placeholderTextColor="#A3A5AA"
              value={voucherCode}
              onChangeText={setVoucherCode}
              onSubmitEditing={applyVoucher}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={applyVoucher}
              disabled={!canApply}
              activeOpacity={0.8}
              className={`px-5 rounded-xl items-center justify-center ${canApply ? 'bg-ink' : 'bg-subtle'}`}
            >
              <Text className={`font-semibold text-sm ${canApply ? 'text-white' : 'text-muted'}`}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
          {voucherError ? (
            <Text className="text-danger text-xs mt-2">{voucherError}</Text>
          ) : (
            <Text className="text-muted text-xs mt-2">
              Use <Text className="font-semibold text-body">discount10</Text> for 10% off your order.
            </Text>
          )}
        </View>
      )}

      {/* LINE ITEMS */}
      <Row label={`Subtotal (${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'})`} value={formatPrice(subtotal)} />
      {appliedVoucher && (
        <Row label="Discount (10%)" value={`−${formatPrice(discountAmount)}`} valueClassName="text-accent" />
      )}
      <Row label="Shipping" value="Free" />

      {/* FINAL TOTAL */}
      <View className="flex-row justify-between items-end border-t border-line pt-4 mt-2">
        <Text className="text-base font-semibold text-ink">Total</Text>
        <View className="items-end">
          {appliedVoucher && (
            <Text className="text-xs text-muted line-through mb-0.5">{formatPrice(subtotal)}</Text>
          )}
          <Text className="text-2xl font-semibold text-ink tracking-tight">{formatPrice(finalTotal)}</Text>
        </View>
      </View>
      {appliedVoucher && (
        <Text className="text-accent text-xs font-medium text-right mt-1">
          You save {formatPrice(discountAmount)}
        </Text>
      )}
    </View>
  );
}
