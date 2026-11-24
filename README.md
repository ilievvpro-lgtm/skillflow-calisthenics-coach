# Skillflow Calisthenics Coach

така нащата идея е да направим дизайна и цялата хубава част с ai - lovabale целта е да има няколко страници със суич бутони за сраниците отдолу та ще има първо ai coach друго да има страница с мен как изпълнявам видеа с грешно изпълнение на някой скил и правилно друго да има 3-та страница с правоъгълни табове наименувани със скила и вътре да има първо prerequisites за силово ти трябва първо да можеш 10 набирания до гърди и тогава да се върнеш на скила вътре в скила на страница да има с техника, стъпки, брейкдалн на съпки и после -хактипс и и така за всеки скил и ще има страница като ще почва лицева кофичка набиране, сслед тва се дига трудноста-elbow lever,frog stand crow stand, после стойка на ръце, тък прес до стойка на ръце ,лицева на стойка на ръце,силово набиране, после задна везна ,предна везна и тва е само скиловете които мога до средно напреднало ниво нещо такова и след всички скилове да има надъхване от създателя на приложението-моята история как не съм се отказал и че всеки може и накрая линк към ig акаунта ми и тва горе долу мисля да е горе долу отдолу нещо подобно на това Примерна долна навигация

Coach

AI помощник

Technique

Видео уроци

Skills

Умения

My Story

Твоята история тва отдолу нека да го обсъдим и покажи

## Как да продължиш с Claude (вместо Lovable)

Работи като в Lovable: пишеш какво искаш, Claude го прави и ти показва снимка от телефона, а после пускаш промените на живия сайт с една дума.

**Еднократна настройка (около 10 минути):**

1. **Claude в GitHub.** Отвори https://github.com/apps/claude/installations/select_target, избери акаунта `ilievvpro-lgtm` и дай достъп до `skillflow-calisthenics-coach`.
2. **Сайтът във Vercel.** Влез в https://vercel.com с GitHub, натисни **Add New → Project**, избери `skillflow-calisthenics-coach` и **Deploy**. Оттук нататък всяка промяна в `main` излиза на живо сама.
3. **AI треньорът.** Във Vercel работи без ключ (през безплатните кредити на Vercel AI Gateway). Ако искаш да ползва Anthropic ключ: Vercel → проекта → **Settings → Environment Variables** → добави `ANTHROPIC_API_KEY`.
4. **Спри да редактираш в Lovable**, за да няма две места, които променят кода.

**Всеки ден:**

1. Отвори https://claude.ai/code (или приложението Claude → Code) и избери `skillflow-calisthenics-coach`.
2. Напиши какво искаш, например „направи бутоните на скиловете по-големи“.
3. Claude прави промяната, проверява, че нищо не е счупено, и ти праща снимка. Дава ти и линк за преглед на телефона.
4. Харесва ли ти, напиши **„публикувай“**: промяната излиза на живия сайт. Не ти ли харесва, напиши **„върни“**.
5. **/preview** показва как изглежда приложението в момента.

## Stack

TanStack Start (React 19) + Tailwind v4, built with Vite and Nitro, deployed on Vercel.

## Development

You need [Bun](https://bun.sh) (or Node.js 22+ with npm).

```sh
bun install
cp .env.example .env   # then fill in one of the AI keys
bun run dev            # http://localhost:8080
```

Other scripts: `bun run test`, `bun run lint`, `bun run format`, `bun run build`.

## AI coach

`/api/coach` (`src/routes/api/coach.ts`) streams plain text from one of two providers. Keys are server-only and never reach the browser.

- **Anthropic API** – used whenever `ANTHROPIC_API_KEY` is set. Model: `ANTHROPIC_MODEL` (default `claude-opus-5-5`).
- **Vercel AI Gateway** – used otherwise. On Vercel it authenticates automatically (OIDC) and uses the account's free monthly credits; locally set `AI_GATEWAY_API_KEY`. Model: `AI_GATEWAY_MODEL` (default `anthropic/claude-opus-5.5`; any gateway model id works).

## Deploy (Vercel)

Import the GitHub repo in Vercel; the framework preset can stay on "Other". Nitro detects Vercel during the build and writes `.vercel/output`. Add `ANTHROPIC_API_KEY` in Project → Settings → Environment Variables if you want the Anthropic path; leave it unset to use the AI Gateway.
