# Archies App — UX, Retention & ROI Report

Prepared by the agency for archies.com — May 2026

---

## 1. Executive Summary

The current Archies app costs roughly **£3,000/month — £36,000/year** — and is not earning that spend back. It does not look like Archies, it asks for Face ID on a takeaway app, the ordering experience is a webview wrapped in a shell, and there is no cart. Each of these is, on its own, a documented driver of lost orders and lost repeat customers. Together they cap the app's commercial ceiling well below what the spend should be returning.

This document audits those frictions, walks through the redesigned demo we have built (a fully native iOS/Android/Web Expo app, installable today), and lays out a grounded ROI case using public QSR industry benchmarks. The target is straightforward: the app should be returning **at least 5× its monthly cost (~£15k/mo of incremental revenue)**. Every redesigned feature below maps to a specific lever to get there.

---

## 2. Friction Audit — The Current App

| Friction | Why it hurts |
|---|---|
| **Generic UI that doesn't carry the Archies brand** | The app feels interchangeable with any other takeaway app. There is no reason for a customer to open it instead of Uber Eats or Deliveroo — and the brand pays nothing to be on those platforms. |
| **Face ID gate on a food app** | Authentication is a payments-grade barrier being applied to a use case that doesn't need it. Every gate before "see the menu" costs customers, especially on impulse late-night orders. |
| **Webview-based ordering** | A webview cannot give a true native experience: slow loads, broken back-gestures, repeated location prompts every session, awkward Apple Pay integration, no offline state, no push deep-linking. It is the single biggest tell that the app is not really an app. |
| **No cart** | Customers can only deal with one item at a time. This removes the entire surface for upsells, combos, and add-ons. Average Order Value (AOV) is structurally capped. |

These four problems compound. A customer who has to log in with Face ID, accept a location prompt, wait for a webview to load, and then can only order one item, is a customer who will quietly stop opening the app.

---

## 3. The Redesign — What's Been Built

The prototype in this repository is a working Expo (React Native) app that runs on iOS, Android and Web from a single codebase. It is not concepts in Figma — it is a real, navigable application. Six concrete improvements, each tied to a revenue lever:

### 3.1 Branded, native home feed
- **File:** [app/(tabs)/home.tsx](app/(tabs)/home.tsx)
- **What it does:** Personalised greeting based on time of day and customer name, weekend 2× points starburst, "your usual" carousel of items the customer actually orders, live points-to-next-reward tracker.
- **Lever:** Brand recognition + daily-active habit loop. The app feels like Archies the moment it opens.
- *Benchmark: branded QSR apps see roughly 2–3× the session frequency of generic web ordering (Deloitte Digital QSR research).*

### 3.2 Native cart with stackable customisations
- **Files:** [src/store/cart.tsx](src/store/cart.tsx), [app/bag.tsx](app/bag.tsx), [src/components/BagButton.tsx](src/components/BagButton.tsx)
- **What it does:** Real cart state, line items keyed by item + modifiers so a "no cheese, extra bacon" burger stacks separately from a plain one. Quantity stepper, persistent bag button visible on every screen, item-level customisation in [app/item/[slug].tsx](app/item/[slug].tsx) including paid extras.
- **Lever:** AOV uplift. Multi-item baskets and visible add-ons are the entire upsell surface the current app does not have.
- *Benchmark: introducing a persistent cart with upsell prompts typically lifts QSR AOV by 15–25% (NRA and Paytronix industry data).*

### 3.3 No more webview, no more repeat location prompts
- **Files:** [app/(tabs)/locations.tsx](app/(tabs)/locations.tsx), [app/checkout.tsx](app/checkout.tsx)
- **What it does:** Fully native checkout. Saved addresses (Home / Work), location stored once. Native maps deep-link for directions. No web shell, no repeat permission dialogs.
- **Lever:** Removes the single largest cause of mobile cart abandonment — friction at the payment step.
- *Benchmark: mobile checkout abandonment averages around 70% on web / webview, versus closer to 20% in well-designed native flows (Baymard Institute).*

### 3.4 One-tap reorder + order history
- **Files:** [app/(tabs)/home.tsx](app/(tabs)/home.tsx) (reorder tiles), [app/(tabs)/order.tsx](app/(tabs)/order.tsx) (continue-order flow)
- **What it does:** Previous orders sit one tap from the home screen. "Continue order" pre-populates the bag so a repeat customer goes from app-open to placing an order in seconds.
- **Lever:** Repeat purchase frequency — the single biggest driver of lifetime value in QSR.
- *Benchmark: reorder shortcuts drive 25–40% of all orders in mature QSR apps (Starbucks and Domino's published case data).*

### 3.5 Loyalty, tiers and referral baked in, not bolted on
- **Files:** [app/(tabs)/rewards.tsx](app/(tabs)/rewards.tsx), [app/refer.tsx](app/refer.tsx), [app/menu.tsx](app/menu.tsx)
- **What it does:** Three-tier loyalty ladder (Rookie → Regular → Addict), in-store member QR for scanning at the till, claimable rewards (free milkshake, free side, birthday burger). Referral programme with £5 credit to the referrer and £5 to the new customer, with live tracking of invites sent / signed up / ordered.
- **Lever:** Two at once — retention through tier progression (people don't churn from a tier they're climbing), and acquisition at near-zero CAC through referral.
- *Benchmark: loyalty members spend 12–18% more per visit and churn around 30% less than non-members (McKinsey on loyalty programmes, Bond Brand Loyalty annual report).*

### 3.6 Apple Pay and native payments, no Face ID gate at launch
- **File:** [app/checkout.tsx](app/checkout.tsx)
- **What it does:** Customers can browse, build a basket and explore the brand without any auth gate. Authentication only happens when it has to — at the point of placing an order. Apple Pay, saved card, and cash on delivery are all supported, with optional tipping and promo codes.
- **Lever:** Faster checkout = higher conversion, especially on the late-night impulse orders that are Archies' core daypart.
- *Benchmark: Apple Pay typically lifts mobile checkout conversion by 20–30% versus manual card entry (Stripe and Shopify benchmarks).*

---

## 4. ROI Framing — Why This Should Pay For Itself 5×

- **Current spend:** £3,000/mo = £36,000/year.
- **5× target:** the app needs to drive at least **£15,000/mo (~£180,000/year) of incremental revenue** that would not happen without it.
- **Four compounding levers** the redesign attacks:
  1. **Conversion** — native checkout vs. webview. The Baymard delta is the largest single number in this report.
  2. **AOV** — native cart, customisations and paid extras. Industry-typical lift is 15–25%.
  3. **Frequency** — reorder shortcuts, push notifications, loyalty tier progression. Mature QSR apps see 25–40% of orders come through reorder alone.
  4. **Acquisition cost** — referral programme at £5/£5 is dramatically cheaper than paid social or aggregator commission.
- **The maths the client can do themselves:** a single location turning over £20,000/month in takeaway only needs a blended ~7–8% uplift across those four levers to clear the 5× threshold. Each lever on its own typically delivers more than that in QSR benchmarks. Across multiple locations, the case becomes overwhelming.

The £3k/month is not the question. The question is what that £3k is being asked to do.

---

## 5. What This Proves

The redesign is not a pitch deck. It is a working Expo app — installable on iOS, Android and Web — with native cart state, a real checkout flow, loyalty tiers, referral mechanics and brand-true UI already built. Everything in this document maps to a file in this repository.

The question for Archies is not "could a better app work?" The QSR industry has already answered that question. The question is why the brand is still paying £3,000 a month for the version that doesn't.

We would like to show you the demo on a real device and walk through it screen by screen.
