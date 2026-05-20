// Sign Up — three-step flow (About you → Account details → Create password).
// Each step has its own display headline + form fields, sharing the same progress bar.
import React, { useState } from 'react';
import { View, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Pill } from '@/components/Pill';
import { Icons } from '@/components/Icon';
import { colors, fonts } from '@/theme/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Form = {
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  birthdate: string;
  email: string;
  emailOptIn: boolean;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

const initial: Form = {
  firstName: 'James',
  lastName: 'Carter',
  city: '',
  phone: '',
  birthdate: '',
  email: '',
  emailOptIn: true,
  password: '',
  confirmPassword: '',
  agreeTerms: true,
};

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<Form>(initial);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const onBack = () => {
    if (step === 1) router.back();
    else setStep((s) => (s - 1) as 1 | 2);
  };
  const onNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else router.replace('/home');
  };

  const canContinue =
    step === 1 ? form.firstName.trim().length > 0 :
    step === 2 ? form.city.trim().length > 0 && form.email.trim().length > 0 :
    form.password.length >= 10 && form.password === form.confirmPassword && form.agreeTerms;

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark"/>

      {/* Top bar */}
      <View style={{
        paddingTop: insets.top + 8, paddingHorizontal: 22,
        flexDirection: 'row', justifyContent: 'space-between',
      }}>
        <Pressable onPress={onBack} style={{
          width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff',
          borderWidth: 1.5, borderColor: colors.ink,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Icons.Back size={18}/>
        </Pressable>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 28, paddingTop: 12 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/* Step bars */}
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 28 }}>
            {[1, 2, 3].map((n) => (
              <View key={n} style={{
                flex: 1, height: 6, borderRadius: 3,
                backgroundColor: n <= step ? colors.pink : 'rgba(31,16,20,0.12)',
                borderWidth: 1, borderColor: colors.ink,
              }}/>
            ))}
          </View>

          {step === 1 && <Step1 form={form} set={set}/>}
          {step === 2 && <Step2 form={form} set={set}/>}
          {step === 3 && <Step3 form={form} set={set}/>}

          <View style={{ flex: 1 }}/>

          <View style={{ paddingBottom: insets.bottom + 16, paddingTop: 24 }}>
            <Pill
              kind="pink"
              size="lg"
              full
              icon={<Icons.Arrow color={colors.cream} size={16}/>}
              onPress={canContinue ? onNext : undefined}
              style={{ opacity: canContinue ? 1 : 0.5 }}>
              {step === 3 ? 'Register' : 'Continue'}
            </Pill>
            <Mono size={11} color={colors.mute} style={{ textAlign: 'center', marginTop: 14 }}>
              Already have an account?{' '}
              <Mono size={11} color={colors.pinkDeep} onPress={() => router.replace('/login')}>Log in</Mono>
            </Mono>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Step1({ form, set }: { form: Form; set: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <>
      <Kicker>STEP 01 — ABOUT YOU</Kicker>
      <Display size={56} color={colors.ink} shadow={{ color: colors.pink, x: 4, y: 4 }}>WHAT</Display>
      <Display size={56} color={colors.ink} shadow={{ color: colors.pink, x: 4, y: 4 }}>SHOULD</Display>
      <Display size={56} color={colors.ink} shadow={{ color: colors.pink, x: 4, y: 4 }}>WE CALL</Display>
      <Italic size={56} color={colors.pink} shadow={{ color: colors.ink, x: 4, y: 4 }} style={{ marginTop: -10, marginLeft: 6 }}>you?</Italic>

      <View style={{ marginTop: 28, gap: 14 }}>
        <Field label="First name" value={form.firstName} onChangeText={(v: string) => set('firstName', v)}/>
        <Field label="Last name" value={form.lastName} onChangeText={(v: string) => set('lastName', v)}/>
        <RewardNudge/>
      </View>
    </>
  );
}

function Step2({ form, set }: { form: Form; set: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <>
      <Kicker>STEP 02 — ACCOUNT DETAILS</Kicker>
      <Display size={56} color={colors.ink} shadow={{ color: colors.pink, x: 4, y: 4 }}>WHERE'S</Display>
      <Display size={56} color={colors.ink} shadow={{ color: colors.pink, x: 4, y: 4 }}>HOME</Display>
      <Italic size={56} color={colors.pink} shadow={{ color: colors.ink, x: 4, y: 4 }} style={{ marginTop: -10, marginLeft: 6 }}>base?</Italic>

      <View style={{ marginTop: 28, gap: 14 }}>
        <Field
          label="City *"
          value={form.city}
          onChangeText={(v: string) => set('city', v)}
          placeholder="Manchester"
          autoCapitalize="words"/>
        <Field
          label="Phone number"
          value={form.phone}
          onChangeText={(v: string) => set('phone', v)}
          placeholder="07700 900000"
          keyboardType="phone-pad"/>
        <Field
          label="Birthdate"
          value={form.birthdate}
          onChangeText={(v: string) => set('birthdate', v)}
          placeholder="YYYY-MM-DD"
          hint="Date format should be YYYY-MM-DD"
          keyboardType="numbers-and-punctuation"/>
        <Field
          label="Email address *"
          value={form.email}
          onChangeText={(v: string) => set('email', v)}
          placeholder="james@archies.co"
          autoCapitalize="none"
          keyboardType="email-address"/>
        <Checkbox
          checked={form.emailOptIn}
          onToggle={() => set('emailOptIn', !form.emailOptIn)}
          label="Email Opt In"/>
      </View>
    </>
  );
}

function Step3({ form, set }: { form: Form; set: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const pwdHint = form.password.length === 0 ? '10+ characters'
    : form.password.length < 10 ? `${form.password.length}/10 characters`
    : '✓ Looks good';
  const matchHint = form.confirmPassword.length === 0 ? '10+ characters'
    : form.password === form.confirmPassword ? '✓ Passwords match'
    : 'Passwords don\'t match yet';

  return (
    <>
      <Kicker>STEP 03 — CREATE PASSWORD</Kicker>
      <Display size={56} color={colors.ink} shadow={{ color: colors.pink, x: 4, y: 4 }}>LOCK IT</Display>
      <Italic size={56} color={colors.pink} shadow={{ color: colors.ink, x: 4, y: 4 }} style={{ marginTop: -10, marginLeft: 6 }}>down.</Italic>

      <View style={{ marginTop: 28, gap: 14 }}>
        <Field
          label="Password"
          value={form.password}
          onChangeText={(v: string) => set('password', v)}
          placeholder="At least 10 characters"
          secureTextEntry={!showPwd}
          hint={pwdHint}
          hintColor={form.password.length >= 10 ? colors.pinkDeep : colors.mute}
          trailing={
            <Pressable onPress={() => setShowPwd((s) => !s)}>
              <Icons.Eye color={colors.mute} size={18}/>
            </Pressable>
          }/>
        <Field
          label="Confirm password"
          value={form.confirmPassword}
          onChangeText={(v: string) => set('confirmPassword', v)}
          placeholder="Type it again"
          secureTextEntry={!showConfirm}
          hint={matchHint}
          hintColor={form.confirmPassword.length > 0 && form.password === form.confirmPassword ? colors.pinkDeep : colors.mute}
          trailing={
            <Pressable onPress={() => setShowConfirm((s) => !s)}>
              <Icons.Eye color={colors.mute} size={18}/>
            </Pressable>
          }/>
        <Checkbox
          checked={form.agreeTerms}
          onToggle={() => set('agreeTerms', !form.agreeTerms)}
          label={
            <Body size={13} color={colors.ink}>
              I agree to <Body weight="700" color={colors.pinkDeep}>Archie's Terms & Conditions</Body>
            </Body>
          }/>
      </View>
    </>
  );
}

function Kicker({ children }: { children: string }) {
  return (
    <View style={{
      alignSelf: 'flex-start', backgroundColor: colors.pinkMist,
      paddingHorizontal: 10, paddingVertical: 5,
      borderWidth: 1.5, borderColor: colors.pinkDeep,
      marginBottom: 12,
    }}>
      <Mono size={11} color={colors.pinkDeep}>{children}</Mono>
    </View>
  );
}

function RewardNudge() {
  return (
    <View style={{
      backgroundColor: colors.pinkMist, borderRadius: 18, padding: 14,
      flexDirection: 'row', alignItems: 'center', gap: 12,
      borderWidth: 1.5, borderColor: colors.pinkDeep,
    }}>
      <View style={{
        width: 32, height: 32, borderRadius: 10, backgroundColor: colors.pink,
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 1.5, borderColor: colors.ink,
      }}>
        <Icons.Star color={colors.butter} size={16}/>
      </View>
      <Body size={12} color={colors.ink2} style={{ flex: 1 }}>
        <Body weight="700" color={colors.ink}>50 welcome points</Body> are waiting when you finish signing up.
      </Body>
    </View>
  );
}

type FieldProps = {
  label: string;
  hint?: string;
  hintColor?: string;
  trailing?: React.ReactNode;
  value?: string;
  onChangeText?: (v: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: any;
};

function Field({ label, hint, hintColor, trailing, ...inputProps }: FieldProps) {
  return (
    <View>
      <View style={{
        backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 18, paddingVertical: 12,
        flexDirection: 'row', alignItems: 'center', gap: 8,
        borderWidth: 1, borderColor: colors.line2,
      }}>
        <View style={{ flex: 1 }}>
          <Mono size={10} color={colors.mute}>{label}</Mono>
          <TextInput
            {...inputProps}
            placeholderTextColor={colors.mute2}
            style={{
              fontFamily: fonts.textMedium, fontSize: 16, color: colors.ink,
              paddingVertical: 0, marginTop: 2,
            }}/>
        </View>
        {trailing}
      </View>
      {hint && (
        <Mono size={9} color={hintColor ?? colors.mute} style={{ marginTop: 6, marginLeft: 4 }}>{hint}</Mono>
      )}
    </View>
  );
}

function Checkbox({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: React.ReactNode }) {
  return (
    <Pressable onPress={onToggle} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 }}>
      <View style={{
        width: 24, height: 24, borderRadius: 6,
        backgroundColor: checked ? colors.pink : '#fff',
        borderWidth: 1.5, borderColor: colors.ink,
        alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <Icons.Check color={colors.cream} size={14}/>}
      </View>
      {typeof label === 'string'
        ? <Body size={13} color={colors.ink} style={{ flex: 1 }}>{label}</Body>
        : <View style={{ flex: 1 }}>{label}</View>}
    </Pressable>
  );
}
