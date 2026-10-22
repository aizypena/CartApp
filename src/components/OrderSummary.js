import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

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
    <View className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
      <Text className="text-lg font-bold text-white mb-4">Order Summary</Text>

      {/* SUBTOTAL */}
      <View className="flex-row justify-between mb-3">
        <Text className="text-slate-400 text-sm font-medium">Subtotal ({totalItemCount} items)</Text>
        <Text className="font-bold text-white text-base">{formatPrice(subtotal)}</Text>
      </View>

      {/* VOUCHER: applied state or input */}
      {appliedVoucher ? (
        <View className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-2xl my-2 flex-row justify-between items-center">
          <View>
            <Text className="text-emerald-300 text-xs font-bold">
              ✓ "{appliedVoucher.code}" applied · {appliedVoucher.label}
            </Text>
            <TouchableOpacity onPress={removeVoucher} activeOpacity={0.7} className="mt-1">
              <Text className="text-emerald-500 text-[11px] font-semibold underline">Remove voucher</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-emerald-400 text-sm font-bold">-{formatPrice(discountAmount)}</Text>
        </View>
      ) : (
        <View className="my-2">
          <View className="flex-row items-center">
            <TextInput
              className={`flex-1 bg-slate-950 border rounded-l-2xl p-3.5 text-white text-sm ${
                voucherError ? 'border-rose-500/60' : 'border-slate-800'
              }`}
              placeholder="Voucher code"
              placeholderTextColor="#64748b"
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
              activeOpacity={0.7}
              className={`px-5 py-3.5 rounded-r-2xl ${canApply ? 'bg-indigo-600' : 'bg-slate-700'}`}
            >
              <Text className="text-white font-bold text-sm">Apply</Text>
            </TouchableOpacity>
          </View>
          {voucherError ? (
            <Text className="text-rose-400 text-[11px] mt-1 ml-1">{voucherError}</Text>
          ) : (
            <Text className="text-slate-500 text-[11px] mt-1 ml-1">
              💡 Tip: Enter <Text className="font-bold text-indigo-400">discount10</Text> for 10% off
            </Text>
          )}
        </View>
      )}

      {/* FINAL TOTAL */}
      <View className="border-t border-slate-800 pt-4 mt-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-black text-white">Total</Text>
          <View className="items-end">
            {appliedVoucher && (
              <Text className="text-slate-500 text-sm line-through">{formatPrice(subtotal)}</Text>
            )}
            <Text className="text-3xl font-black text-indigo-400">{formatPrice(finalTotal)}</Text>
          </View>
        </View>
        {appliedVoucher && (
          <Text className="text-emerald-400 text-xs font-semibold text-right mt-1">
            You save {formatPrice(discountAmount)}
          </Text>
        )}
      </View>
    </View>
  );
}
