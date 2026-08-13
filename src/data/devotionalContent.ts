export interface DevotionalArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'devotional' | 'article' | 'video' | 'study';
  duration: string;
  author: string;
  date: string;
  imageUrl?: string;
  videoUrl?: string;
  scripture?: string;
  tags: string[];
}

export const devotionalContent: DevotionalArticle[] = [
  {
    id: 'armor-of-god',
    title: 'Daily Armor: Putting on Ephesians 6',
    excerpt: 'Learn how to daily equip yourself with the full armor of God for spiritual battle.',
    content: `The spiritual battle is real, and God has provided us with everything we need to stand firm. In Ephesians 6:10-18, Paul outlines the armor of God—not as optional equipment, but as essential gear for every believer.

**The Belt of Truth** (v. 14a)
Truth holds everything together. Start each day by grounding yourself in God's Word—the ultimate source of truth. When lies come (and they will), you'll have a foundation to stand on.

**The Breastplate of Righteousness** (v. 14b)
This protects your heart. Not your own righteousness, but Christ's righteousness credited to you. When shame attacks, remember whose you are.

**Shoes of the Gospel of Peace** (v. 15)
Be ready to stand firm and to move forward. Peace with God gives you stability in any terrain.

**The Shield of Faith** (v. 16)
Faith isn't just believing—it's active trust that extinguishes the enemy's attacks. Hold it up daily.

**The Helmet of Salvation** (v. 17a)
Protect your mind with the assurance of your salvation. The enemy loves to attack our thoughts. Guard them.

**The Sword of the Spirit** (v. 17b)
The only offensive weapon—God's Word. Know it. Memorize it. Use it.

**Prayer** (v. 18)
The communication that makes the armor effective. Pray at all times, in all circumstances.

**Daily Practice:**
Each morning, visualize putting on each piece. Name them out loud. Thank God for His provision. Then walk into your day fully armed.`,
    category: 'devotional',
    duration: '5 min read',
    author: 'Iron Sharpens Iron',
    date: '2024-01-15',
    scripture: 'Ephesians 6:10-18',
    tags: ['spiritual warfare', 'armor of god', 'daily practice'],
  },
  {
    id: 'understanding-triggers',
    title: 'Understanding Your Triggers',
    excerpt: 'Identify the patterns that lead to temptation and build a strategy to overcome.',
    content: `Every fall begins somewhere. Understanding your triggers isn't about making excuses—it's about building a battle plan.

**What is a Trigger?**
A trigger is any stimulus—internal or external—that initiates a temptation cycle. It could be:
- **Emotional**: Stress, loneliness, boredom, anxiety, anger
- **Environmental**: Certain locations, times of day, or situations
- **Relational**: Conflict, rejection, or isolation
- **Physical**: Tiredness, hunger, or being alone

**The HALT Principle**
Never make decisions when you're:
- **H**ungry
- **A**ngry
- **L**onely
- **T**ired

These states lower your defenses and make you vulnerable.

**Identifying Your Patterns**
Take time to journal about your last few falls:
1. What time of day was it?
2. Where were you?
3. How were you feeling emotionally?
4. What happened in the hours before?
5. Were you isolated or connected?

**Building Your Defense**
Once you know your triggers:
1. **Remove access** where possible
2. **Create accountability** for high-risk times
3. **Build healthy alternatives** (exercise, call a friend, pray)
4. **Plan your escape routes** before you need them

**Scripture to Remember:**
"No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it." — 1 Corinthians 10:13

**Action Step:**
Write down your top 3 triggers this week. Share them with an accountability partner. Create a specific plan for each one.`,
    category: 'article',
    duration: '8 min read',
    author: 'Iron Sharpens Iron',
    date: '2024-01-12',
    tags: ['triggers', 'self-awareness', 'strategy'],
  },
  {
    id: 'breaking-free-30-days',
    title: 'Breaking Free: The First 30 Days',
    excerpt: 'A comprehensive video guide to navigating the crucial first month of your freedom journey.',
    content: `This video series walks you through the most critical phase of breaking free from habitual sin—the first 30 days.

**Week 1: Foundation**
- Understanding the neurological reset that's happening
- Why the first week is the hardest
- Building your support system
- Emergency protocols for moments of weakness

**Week 2: Identity**
- Moving from "trying not to sin" to "living as a new creation"
- Renewing your mind with Scripture
- Breaking shame cycles
- Celebrating small victories

**Week 3: Patterns**
- Establishing healthy routines
- Replacing old habits with new ones
- Dealing with setbacks without derailing
- Deepening your prayer life

**Week 4: Community**
- Why you can't do this alone
- Finding or building an accountability group
- Being vulnerable without oversharing
- Preparing for long-term victory

**Key Scripture:**
"Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" — 2 Corinthians 5:17`,
    category: 'video',
    duration: '45 min',
    author: 'Iron Sharpens Iron',
    date: '2024-01-10',
    videoUrl: 'https://example.com/breaking-free-video',
    scripture: '2 Corinthians 5:17',
    tags: ['video course', 'beginner', '30 days'],
  },
  {
    id: 'psalm-51-study',
    title: 'Deep Dive: Psalm 51 - A Prayer of Repentance',
    excerpt: 'Explore David\'s powerful prayer of confession and restoration.',
    content: `Psalm 51 is David's cry to God after his sin with Bathsheba was exposed. It's the most profound prayer of repentance in Scripture—and a model for us.

**Context:**
After committing adultery and murder, David was confronted by the prophet Nathan. This psalm is his response—raw, honest, and desperate for God.

**Verse by Verse:**

**v. 1-2: The Appeal to Mercy**
"Have mercy on me, O God, according to your unfailing love..."
David doesn't appeal to his own goodness. He throws himself entirely on God's character.

**v. 3-4: Honest Confession**
"Against you, you only, have I sinned..."
True confession names the sin and acknowledges its offense against God.

**v. 5-6: Going Deeper**
"Surely I was sinful at birth..."
David recognizes this isn't just about one act—it's about a sinful nature that needs transformation.

**v. 7-9: The Cleansing Request**
"Cleanse me with hyssop... Wash me, and I will be whiter than snow."
Hyssop was used in purification rituals. David asks for complete cleansing.

**v. 10-12: The Restoration Prayer**
"Create in me a pure heart, O God, and renew a steadfast spirit within me."
This is the heart of the prayer—not just forgiveness, but transformation.

**v. 13-17: The Commitment**
David promises to teach others and offer praise. True repentance leads to mission.

**v. 18-19: The Bigger Picture**
David ends by praying for Jerusalem—his repentance isn't just personal, it's for the good of God's people.

**Application:**
Use this psalm as a template for your own confession. Be specific. Be honest. Trust in God's mercy.`,
    category: 'study',
    duration: '12 min read',
    author: 'Iron Sharpens Iron',
    date: '2024-01-08',
    scripture: 'Psalm 51',
    tags: ['bible study', 'repentance', 'psalms', 'david'],
  },
  {
    id: 'power-of-accountability',
    title: 'The Power of Accountability',
    excerpt: 'Why going alone is the enemy\'s strategy, and how real accountability changes everything.',
    content: `"As iron sharpens iron, so one person sharpens another." — Proverbs 27:17

**The Lie of Isolation**
The enemy's first strategy is always isolation. "No one will understand. You'll be judged. Handle this yourself." These lies keep us trapped.

**Why Accountability Works**

1. **Breaks Shame's Power**
Shame thrives in darkness. The moment you speak your struggle out loud to a trusted brother, shame begins to lose its grip.

2. **Provides Early Warning**
A good accountability partner notices when you're drifting before you do. They ask the hard questions.

3. **Creates Positive Pressure**
Knowing someone will ask about your week changes how you live that week.

4. **Offers Prayer Support**
"Confess your sins to each other and pray for each other so that you may be healed." — James 5:16

**What Real Accountability Looks Like**

- **Regular check-ins** (at least weekly)
- **Honest questions** that go beyond surface level
- **No judgment**, but also no enabling
- **Mutual vulnerability** (it's not one-way)
- **Prayer together**
- **Celebrating victories**

**How to Find an Accountability Partner**

1. Look for someone further along in their journey
2. Choose someone you respect and who respects you
3. Pick someone who will be honest, not just nice
4. Find someone available and committed

**The Hard Truth**
If you're not willing to be known, you're not ready to be free. Freedom requires vulnerability.

**Your Next Step**
If you don't have an accountability partner, ask God to show you who it should be. Then have the courage to ask them.`,
    category: 'article',
    duration: '6 min read',
    author: 'Iron Sharpens Iron',
    date: '2024-01-05',
    scripture: 'Proverbs 27:17',
    tags: ['accountability', 'community', 'relationships'],
  },
  {
    id: 'morning-routine',
    title: 'Building a Warrior\'s Morning Routine',
    excerpt: 'Start each day with intention and set yourself up for victory.',
    content: `How you start your morning often determines how you finish your day. A warrior's morning routine isn't about being perfect—it's about being prepared.

**Why Mornings Matter**
- Your willpower is highest in the morning
- You set the trajectory for the day
- You can pray and armor up before battles begin

**A Simple Framework: P.R.A.Y.**

**P - Praise**
Start with gratitude and worship. Even 2 minutes of thanking God shifts your perspective.

**R - Read**
Open the Word. Even one verse, read slowly and meditatively, is powerful. Consider reading the verse of the day and journaling one thought.

**A - Ask**
Pray specifically:
- For protection today
- For strength in weak areas
- For opportunities to serve others
- For your accountability partner

**Y - Yield**
Surrender the day to God. "Not my will, but yours be done." Give Him your schedule, your challenges, your fears.

**Practical Tips**

1. **Wake up before you have to** — even 15 minutes makes a difference
2. **Phone stays off** until your routine is done
3. **Same time, same place** builds habit
4. **Start small** — a 10-minute routine you do beats a 60-minute one you skip

**Sample 15-Minute Routine:**
- 2 min: Praise (spoken or sung)
- 5 min: Read Scripture + Verse of the Day
- 5 min: Prayer (use ACTS: Adoration, Confession, Thanksgiving, Supplication)
- 3 min: Put on the Armor of God (Eph. 6)

**Remember:**
"Very early in the morning, while it was still dark, Jesus got up, left the house and went off to a solitary place, where he prayed." — Mark 1:35

If Jesus needed morning prayer, so do we.`,
    category: 'article',
    duration: '5 min read',
    author: 'Iron Sharpens Iron',
    date: '2024-01-03',
    scripture: 'Mark 1:35',
    tags: ['morning routine', 'habits', 'prayer', 'discipline'],
  },
  {
    id: 'renewing-your-mind',
    title: 'The Battle for Your Mind',
    excerpt: 'How to take every thought captive and renew your thinking through Scripture.',
    content: `The mind is the primary battlefield. Every action begins as a thought. Win the battle in your mind, and you win the war.

**The Problem**
Our minds are constantly bombarded—by media, memories, and the enemy's whispers. Paul understood this: "We demolish arguments and every pretension that sets itself up against the knowledge of God, and we take captive every thought to make it obedient to Christ." — 2 Corinthians 10:5

**What "Renewing Your Mind" Means**
Romans 12:2 says, "Do not conform to the pattern of this world, but be transformed by the renewing of your mind."

Renewal isn't passive. It's an active, daily choice to:
1. **Identify the lie** — What false belief is driving this thought?
2. **Replace it with truth** — What does God's Word say instead?
3. **Repeat until it sticks** — Neuroplasticity is real. New pathways form with repetition.

**Practical Strategies**

**Scripture Memory**
Pick one verse per week. Write it on a card. Review it morning, noon, and night. In 12 months, you'll have 52 verses as weapons.

**Thought Journaling**
When a destructive thought hits, write it down. Next to it, write the truth from Scripture. Over time, patterns emerge—and so does freedom.

**Guard Your Inputs**
"Above all else, guard your heart, for everything you do flows from it." — Proverbs 4:23

What you consume shapes what you think. Audit your:
- Social media feeds
- Entertainment choices
- Music playlists
- Conversations

**The Promise**
"You will keep in perfect peace those whose minds are steadfast, because they trust in you." — Isaiah 26:3

A renewed mind leads to perfect peace. That's worth fighting for.`,
    category: 'devotional',
    duration: '6 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-02-10',
    scripture: 'Romans 12:2',
    tags: ['mind renewal', 'thought life', 'scripture memory', 'identity'],
  },
  {
    id: 'grace-after-failure',
    title: 'Grace After the Fall: Getting Back Up',
    excerpt: 'What to do when you stumble — and why God\'s grace is bigger than your failure.',
    content: `You fell. Maybe after a long streak. Maybe after just a few days. The shame is suffocating, and the enemy is screaming, "See? You'll never change."

Here's the truth: **Your failure does not define you. God's grace does.**

**What NOT to Do**

1. **Don't spiral** — One fall doesn't undo your progress. Don't let shame push you into a binge.
2. **Don't isolate** — The enemy wants you alone. Reach out to your accountability partner immediately.
3. **Don't make vows you can't keep** — "I'll never do this again" isn't repentance. It's willpower dressed up as faith.

**What TO Do**

1. **Confess immediately** — To God first (1 John 1:9), then to a trusted brother (James 5:16).
2. **Identify what happened** — What trigger did you miss? What boundary failed? Learn from it.
3. **Get back in the fight** — The warrior isn't the one who never falls. It's the one who always gets back up.

**The Father's Heart**
Read the parable of the Prodigal Son (Luke 15:11-32). The father didn't lecture. He didn't shame. He ran to his son, embraced him, and threw a party.

That's how God sees you right now.

**A Prayer for Right Now:**
"Father, I failed. I'm not making excuses. I bring my sin into the light and ask for Your cleansing. Thank You that there is no condemnation for those in Christ Jesus. Restore me. Strengthen me. I'm getting back up. In Jesus' name, Amen."

**Remember:**
"The righteous person may fall seven times but still gets up." — Proverbs 24:16

Get up. He's waiting for you with open arms.`,
    category: 'devotional',
    duration: '5 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-02-08',
    scripture: 'Proverbs 24:16',
    tags: ['grace', 'failure', 'restoration', 'hope'],
  },
  {
    id: 'fasting-for-freedom',
    title: 'Fasting as a Weapon for Freedom',
    excerpt: 'How biblical fasting breaks spiritual chains and sharpens your walk.',
    content: `Fasting is one of the most powerful yet underused weapons in the believer's arsenal. Jesus didn't say "if you fast" — He said "when you fast" (Matthew 6:16).

**Why Fast?**

1. **Spiritual sharpening** — Fasting heightens your sensitivity to the Holy Spirit.
2. **Breaking strongholds** — Jesus said some things only come out through prayer and fasting (Mark 9:29).
3. **Declaring dependence** — You're telling your flesh, "You are not in charge."
4. **Creating space** — When you remove food (or media, or entertainment), you create space for God to speak.

**Types of Fasts**

- **Complete fast** — Water only (consult a doctor first)
- **Partial fast** — Skip one or two meals
- **Daniel fast** — Fruits, vegetables, grains only
- **Media fast** — No social media, news, or entertainment
- **Combined fast** — Food + media for maximum impact

**How to Start**

1. **Set a purpose** — What are you seeking God for? Write it down.
2. **Choose a duration** — Start with 1 day. Build to 3, then 7.
3. **Plan your prayer times** — Use meal times for prayer instead.
4. **Stay hydrated** — Always drink water.
5. **Break it gently** — Don't gorge after a fast. Ease back in.

**During Your Fast**

- Read Scripture more than usual
- Journal what God reveals
- Pray specifically for your area of struggle
- Worship through the hunger
- Memorize a key verse

**The Promise**
"Is not this the kind of fasting I have chosen: to loose the chains of injustice... to set the oppressed free and break every yoke?" — Isaiah 58:6

God promises that fasting breaks chains. Yours included.`,
    category: 'article',
    duration: '7 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-02-05',
    scripture: 'Isaiah 58:6',
    tags: ['fasting', 'spiritual disciplines', 'freedom', 'prayer'],
  },
  {
    id: 'identity-in-christ',
    title: 'Who You Really Are: Identity in Christ',
    excerpt: 'Stop living from your sin identity and start living from your new creation reality.',
    content: `The single most important factor in lasting freedom? **Knowing who you are.**

The enemy's primary strategy isn't just temptation — it's identity theft. He wants you to believe you ARE your sin. You're not. You're a new creation.

**The Old Identity (Lies)**
- "I'm an addict"
- "I'll always struggle with this"
- "I'm damaged goods"
- "God is disappointed in me"

**Your True Identity (Truth)**
According to Scripture, if you are in Christ:
- You are a **new creation** (2 Cor. 5:17)
- You are **chosen and holy** (Col. 3:12)
- You are **more than a conqueror** (Rom. 8:37)
- You are **God's workmanship** (Eph. 2:10)
- You are **free** (Gal. 5:1)
- You are **forgiven** (Eph. 1:7)
- You are **sealed by the Holy Spirit** (Eph. 1:13)

**The Shift**
Stop trying to BECOME righteous. Start living FROM the righteousness already given to you.

This isn't about ignoring sin. It's about fighting from victory, not for victory. The battle is already won. You're learning to live in that reality.

**Daily Identity Practice**

Every morning, read these declarations out loud:
1. "I am who God says I am, not who my past says I am."
2. "My identity is not my struggle. My identity is Christ in me."
3. "I am not fighting for acceptance. I am fighting from acceptance."
4. "Today I choose to live as the new creation I already am."

**Scripture to Memorize:**
"Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" — 2 Corinthians 5:17

**The Turning Point**
When your identity is rooted in Christ rather than your behavior, everything changes. You stop white-knuckling your way through temptation and start walking in the power of who you really are.`,
    category: 'study',
    duration: '8 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-02-01',
    scripture: '2 Corinthians 5:17',
    tags: ['identity', 'new creation', 'truth', 'freedom'],
  },
  {
    id: 'digital-boundaries',
    title: 'Setting Digital Boundaries That Work',
    excerpt: 'Practical steps to guard your eyes and heart in a hyper-connected world.',
    content: `We carry more temptation in our pockets than any generation before us. The battle for purity in the digital age requires intentional, practical boundaries.

**The Principle**
"I made a covenant with my eyes not to look lustfully at a young woman." — Job 31:1

Job made a proactive decision BEFORE temptation came. That's what boundaries are — pre-decisions that protect you.

**Device Boundaries**

1. **No phone in the bedroom** — Buy a $10 alarm clock. Charge your phone in another room.
2. **Content filters** — Install accountability/filtering software. Share access with your partner.
3. **No private browsing** — Delete any apps that allow anonymous browsing.
4. **Screen time limits** — Set app timers, especially for social media.
5. **Phone-free zones** — Bathrooms, bedrooms, and late-night hours.

**Social Media Guardrails**

- Unfollow accounts that trigger lust or comparison
- Use social media with a purpose, not out of boredom
- Set a daily time limit (30 min max recommended)
- Never scroll when you're in a HALT state (Hungry, Angry, Lonely, Tired)

**The "Two-Second Rule"**
You can't prevent every tempting image from appearing. But you CAN control the second look. The first glance is reflexive. The second is a choice. Train yourself to look away within two seconds.

**Building Replacement Habits**
When you feel the urge to browse mindlessly:
- Open your Bible app instead
- Text your accountability partner
- Do 20 pushups
- Step outside for fresh air
- Put on worship music

**When You Travel**
- Request content filters at hotels
- Keep your laptop in common areas
- Check in with your accountability partner daily
- Plan your evenings — boredom + isolation = danger

**Remember:**
"Flee from sexual immorality." — 1 Corinthians 6:18

Notice it doesn't say "resist" or "fight." It says **flee**. Sometimes the bravest thing is to run.`,
    category: 'article',
    duration: '7 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-01-28',
    scripture: 'Job 31:1',
    tags: ['digital boundaries', 'purity', 'technology', 'practical'],
  },
  {
    id: 'brotherhood-that-sharpens',
    title: 'Brotherhood That Sharpens',
    excerpt: 'Why isolated men fall and connected men stand.',
    content: `Iron sharpens iron. But iron only sharpens iron when the two pieces actually make contact.

**Isolation Is the Battlefield of Defeat**
The enemy doesn't need to overpower you if he can separate you. A man alone rationalizes. A man alone hides. A man alone slowly convinces himself that his compromise is normal.

**Contact Requires Friction**
Real brotherhood is not comfortable. It asks hard questions. It notices when you go quiet. It calls out the drift before it becomes a fall.

**Three Marks of a Sharpening Friendship**
1. Honesty without flattery — he tells you the truth even when it costs him.
2. Presence without schedule — he shows up when it isn't convenient.
3. Faith without shame — he points you back to Christ, not to guilt.

**This Week's Move**
Text one man today. Tell him one true thing about where you actually are. Not the summary — the truth. That single message breaks isolation's grip.`,
    category: 'devotional',
    duration: '4 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-02-04',
    scripture: 'Proverbs 27:17',
    tags: ['brotherhood', 'accountability', 'isolation'],
  },
  {
    id: 'discipline-over-motivation',
    title: 'Discipline Outlives Motivation',
    excerpt: 'Feelings fade. Covenants hold. Build a life that runs without hype.',
    content: `Motivation is a guest. Discipline is a resident.

**Why Motivation Fails**
Motivation is emotional fuel, and emotions are weather. You cannot build a house on weather. Every man who has fallen had motivation once — what he lacked was a structure that held when the feeling left.

**Paul's Training Language**
Paul didn't describe the Christian life as a mood. He described it as training: "I discipline my body and keep it under control" (1 Corinthians 9:27). Athletes don't negotiate with the alarm clock.

**Building the Structure**
- Same time, same place, same first action each morning.
- A minimum standard you never go below, even on bad days.
- A recovery plan for when you miss, so a miss never becomes a month.

**The Reframe**
You are not trying to feel spiritual. You are trying to be faithful. Faithfulness on an ordinary Tuesday is the whole game.`,
    category: 'article',
    duration: '5 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-02-11',
    scripture: '1 Corinthians 9:24-27',
    tags: ['discipline', 'habits', 'perseverance'],
  },
  {
    id: 'guarding-your-eyes',
    title: 'The Covenant of the Eyes',
    excerpt: 'Job made a deal with his eyes before temptation ever showed up.',
    content: `"I have made a covenant with my eyes; how then could I gaze at a virgin?" — Job 31:1

**Decide Before the Moment**
Job's protection wasn't willpower in the moment. It was a decision made in advance. Men who decide in the moment lose in the moment.

**What a Covenant Looks Like**
A covenant is a binding commitment with real terms. Yours might be: I do not scroll in bed. I do not hold my phone alone at night. I look away in the first second, not the third.

**The First Second**
Temptation is rarely won at minute five. It's won at second one — the bounce. Train the bounce until it's reflex.

**Grace for the Fight**
This isn't about earning God's love; you already have it. It's about protecting what you love: your walk, your integrity, your future family.

**Today**
Write your covenant in one sentence. Say it out loud. Tell one brother what it is.`,
    category: 'devotional',
    duration: '4 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-02-18',
    scripture: 'Job 31:1',
    tags: ['purity', 'temptation', 'covenant'],
  },
  {
    id: 'study-romans-8',
    title: 'Bible Study: No Condemnation (Romans 8)',
    excerpt: 'A guided walk through the chapter that dismantles shame.',
    content: `Romans 8 is the freedom chapter. Work through it slowly this week.

**Day 1 — Verses 1-4: The Verdict**
"There is therefore now no condemnation." Not less condemnation. None. Ask: where am I still living under a verdict Christ already overturned?

**Day 2 — Verses 5-11: The Mind Set**
The mind set on the flesh versus the mind set on the Spirit. Ask: what did my mind default to today when it had nothing to do?

**Day 3 — Verses 12-17: The Adoption**
You did not receive a spirit of slavery to fall back into fear. You are a son. Ask: am I relating to God as a slave or as a son?

**Day 4 — Verses 18-25: The Groaning**
Present suffering compared with coming glory. Ask: what am I waiting on that requires hope, not proof?

**Day 5 — Verses 26-30: The Intercession**
The Spirit prays when you have no words. Ask: what have I stopped bringing to God because I couldn't articulate it?

**Day 6 — Verses 31-39: The Security**
Nothing separates you. Read the list out loud. Add your own failure to the list and read it again.

**Day 7 — Review**
Write one paragraph: what changed in how I see God this week?`,
    category: 'study',
    duration: '20 min study',
    author: 'Iron Sharpens Iron',
    date: '2025-02-25',
    scripture: 'Romans 8',
    tags: ['bible study', 'shame', 'identity', 'freedom'],
  },
  {
    id: 'anger-under-authority',
    title: 'Anger Under Authority',
    excerpt: 'Your anger isn\u2019t the enemy. Unsubmitted anger is.',
    content: `"Be angry and do not sin" (Ephesians 4:26). Anger itself is not the sin — what you do with it is.

**Anger Is Information**
Anger tells you something you value felt threatened. Before you react, ask: what did I believe was being taken from me?

**The Three Second Gap**
Between trigger and response there is a gap. Most men have surrendered that gap. Reclaim it with a single practice: breathe, name it, then speak.

**Where Men Get It Wrong**
- Venting: releases pressure, destroys people.
- Suppressing: looks holy, builds a bomb.
- Submitting: brings it to God first, then to the person, with words chosen on purpose.

**The Sunset Rule**
Don't let the sun go down on it. Unresolved anger becomes resentment, and resentment is what the enemy builds strongholds on.

**Practice**
Name the last thing that made you angry. Take it to God out loud before you take it to anyone else.`,
    category: 'article',
    duration: '5 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-03-04',
    scripture: 'Ephesians 4:26-27',
    tags: ['anger', 'emotions', 'self-control'],
  },
  {
    id: 'work-as-worship',
    title: 'Work as Worship',
    excerpt: 'The job you think is ordinary is an altar.',
    content: `"Whatever you do, work heartily, as for the Lord and not for men" (Colossians 3:23).

**There Is No Secular Work for a Man in Christ**
The dividing line isn't ministry versus job. It's faithful versus careless. A well-built wall glorifies God. A finished spreadsheet done with integrity glorifies God.

**Three Shifts**
1. Audience: stop performing for the boss; work before the Lord.
2. Excellence: do the hidden parts well — the parts nobody inspects.
3. Provision: your labor is a form of love for the people who depend on you.

**The Warning**
Work becomes an idol the moment your worth depends on it. Test yourself: how do you feel about yourself on a day you accomplish nothing?

**Today**
Pick the one task you've been doing carelessly. Do it thoroughly, quietly, as worship.`,
    category: 'devotional',
    duration: '4 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-03-11',
    scripture: 'Colossians 3:23-24',
    tags: ['work', 'purpose', 'integrity'],
  },
  {
    id: 'praying-when-dry',
    title: 'Praying When You Feel Nothing',
    excerpt: 'What to do when the heavens feel like brass.',
    content: `Every man who prays long enough hits the desert.

**Dryness Is Not Distance**
Feeling nothing is not proof God left. The clouds don't remove the sun. David wrote half the Psalms from that exact place.

**Pray the Words You Don't Feel**
When your heart is silent, borrow words. Pray Psalm 63. Pray the Lord's Prayer slowly, line by line. Faithfulness in dryness is worth more than fervor in ease.

**Shorten It, Don't Skip It**
A dry man who prays three honest minutes daily stays. A dry man who waits for feeling disappears for months.

**Ask the Honest Question**
"God, I don't feel You. I'm still here." That's a real prayer. He isn't offended by it.

**Remember**
The Spirit intercedes with groanings too deep for words. Even your empty prayers are being carried.`,
    category: 'devotional',
    duration: '3 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-03-18',
    scripture: 'Psalm 63:1',
    tags: ['prayer', 'dryness', 'perseverance'],
  },
  {
    id: 'money-and-the-heart',
    title: 'Where Your Treasure Is',
    excerpt: 'Your bank statement is a spiritual document.',
    content: `"Where your treasure is, there your heart will be also" (Matthew 6:21).

**Follow the Money, Find the Heart**
Jesus didn't say your heart leads your money. He said your money leads your heart. Move the treasure and the heart follows.

**Three Diagnostics**
1. What do you spend on impulsively? That's what soothes you.
2. What do you refuse to give? That's what you trust.
3. What do you hide from your spouse or brother? That's where the enemy has room.

**Generosity as Warfare**
Giving breaks the grip of money faster than budgeting does. It proves to your own heart that you own the money and it doesn't own you.

**This Week**
Give something away that you would rather keep. Then notice what that reveals in you.`,
    category: 'article',
    duration: '5 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-03-25',
    scripture: 'Matthew 6:19-24',
    tags: ['money', 'generosity', 'idolatry'],
  },
  {
    id: 'leading-your-home',
    title: 'Leading Your Home Without Dominating It',
    excerpt: 'Biblical headship looks like a cross, not a throne.',
    content: `"Husbands, love your wives, as Christ loved the church and gave himself up for her" (Ephesians 5:25).

**The Standard Is Sacrifice**
Christ's leadership of the church cost Him everything. Any version of headship that costs you nothing is a counterfeit.

**Four Practical Marks**
1. You go first in repentance. Always.
2. You set the spiritual temperature — prayer, Scripture, worship in the home.
3. You protect the peace, including from your own moods.
4. You serve in ways nobody applauds.

**For Single Men**
You are not waiting to become a leader. You are becoming one now, in how you steward your time, your body, and your word.

**Today**
Ask the people in your home: "Where have I been hard to live with lately?" Then listen without defending.`,
    category: 'devotional',
    duration: '5 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-04-01',
    scripture: 'Ephesians 5:25-33',
    tags: ['leadership', 'marriage', 'family', 'servanthood'],
  },
  {
    id: 'study-psalm-1',
    title: 'Bible Study: The Two Ways (Psalm 1)',
    excerpt: 'Six verses that map out every man\u2019s life direction.',
    content: `Psalm 1 is short enough to memorize and deep enough to build a life on.

**Verse 1 — The Drift**
Walk, stand, sit. Notice the progression: it starts with proximity and ends with residence. Where have you started merely walking near something you'll eventually sit down in?

**Verse 2 — The Delight**
"His delight is in the law of the Lord, and on his law he meditates day and night." Delight, not duty. Meditation, not skimming. Ask: what do I actually meditate on when I'm alone?

**Verse 3 — The Tree**
Planted, watered, fruitful in season, leaf not withering. Note: the tree doesn't strive. It stays planted near the water. Where are you planted?

**Verses 4-5 — The Chaff**
No roots, no weight, no permanence. The wicked aren't described as strong and evil — they're described as light and blown away.

**Verse 6 — The Knowing**
"The Lord knows the way of the righteous." Not just observes — knows, intimately.

**Application**
Memorize the psalm this week, one verse per day. Say it out loud each morning.`,
    category: 'study',
    duration: '15 min study',
    author: 'Iron Sharpens Iron',
    date: '2025-04-08',
    scripture: 'Psalm 1',
    tags: ['bible study', 'meditation', 'scripture', 'foundations'],
  },
  {
    id: 'confession-that-heals',
    title: 'Confession That Actually Heals',
    excerpt: 'Vague confession keeps you sick. Specific confession sets you free.',
    content: `"Confess your sins to one another and pray for one another, that you may be healed" (James 5:16).

**Why Vague Confession Fails**
"I struggled this week" costs nothing and changes nothing. Shame survives generalities. It dies in specifics.

**The Structure of Real Confession**
1. What happened — plainly, without editing.
2. When and where — the pattern matters.
3. What I was feeling right before — the real trigger.
4. What I need from you — prayer, a check-in, a plan.

**Confess to God First, Then to a Man**
Forgiveness comes from God. Healing often comes through the body. You need both.

**A Warning About the Wrong Listener**
Confess to a man who will neither shame you nor shrug. Shame crushes; shrugging enables. You need a brother who takes it seriously and still looks you in the eye.

**Today**
One specific confession. One brother. This week, not someday.`,
    category: 'devotional',
    duration: '4 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-04-15',
    scripture: 'James 5:16',
    tags: ['confession', 'shame', 'healing', 'accountability'],
  },
  {
    id: 'rest-and-sabbath',
    title: 'The Rest You Keep Refusing',
    excerpt: 'Exhaustion is not a badge. It\u2019s a warning light.',
    content: `God rested. Not because He was tired, but to set a rhythm into creation itself.

**Refusing Rest Is a Trust Issue**
When you can't stop, you're saying the world holds together because of you. It doesn't. Sabbath is a weekly confession that God runs things.

**Exhaustion Multiplies Temptation**
Nearly every man can trace his worst decisions to a stretch of depletion. Tired men rationalize. Rested men resist.

**How to Actually Rest**
- Pick a block of time and defend it like an appointment.
- Put the phone in another room; passive scrolling isn't rest.
- Include something that reminds you God is good — worship, nature, real food, real people.

**The Promise**
"Come to me, all who labor and are heavy laden, and I will give you rest." That invitation is still open. Take it.`,
    category: 'devotional',
    duration: '4 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-04-22',
    scripture: 'Matthew 11:28-30',
    tags: ['rest', 'sabbath', 'burnout', 'trust'],
  },
  {
    id: 'study-philippians-4',
    title: 'Bible Study: The Peace of God (Philippians 4)',
    excerpt: 'A five-day walk through anxiety, prayer, and the peace that guards the heart.',
    content: `Philippians 4 is a battlefield manual for the anxious mind. Paul writes it from prison, yet it overflows with joy and peace.

**Day 1 — Verses 1-3: Stand Firm in Unity**
"Stand firm in the Lord." Paul urges the church to agree in the Lord. Ask: where is conflict in my life draining my energy away from the fight?

**Day 2 — Verses 4-5: Rejoice Always**
Rejoice in the Lord always—not in circumstances. Gentleness is the visible proof that the Lord is near. Ask: what would it look like to be gentle in the one situation that most frustrates me?

**Day 3 — Verses 6-7: The Anxiety Exchange**
"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." Every worry is meant to be handed over. The result is a peace that guards heart and mind. Ask: what have I been carrying that I still haven't fully brought to God?

**Day 4 — Verses 8-9: Think on These Things**
Whatever is true, noble, right, pure, lovely, admirable—think about such things. Your thought diet is a weapon. Ask: what recurring thought is not on this list?

**Day 5 — Verses 10-20: The Secret of Contentment**
"I have learned the secret of being content in any and every situation." Contentment is learned, not earned. Ask: what am I wrongly believing I need in order to be at peace?

**Review**
Write out Philippians 4:6-7 from memory. Carry it as your weapon this week.`,
    category: 'study',
    duration: '18 min study',
    author: 'Iron Sharpens Iron',
    date: '2025-04-29',
    scripture: 'Philippians 4',
    tags: ['bible study', 'anxiety', 'peace', 'prayer', 'mind'],
  },
  {
    id: 'study-james-1',
    title: 'Bible Study: Steadfast Under Trial (James 1)',
    excerpt: 'How temptation works, and how the testing of your faith produces endurance.',
    content: `James pulls no punches. He writes to scattered believers who need a theology that works in the middle of real pressure.

**Day 1 — Verses 1-8: Joy in Trials**
"Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds." Joy is not denial of pain; it is a verdict about what God is producing. Ask: what trial is currently forming endurance in me?

**Day 2 — Verses 9-15: The Anatomy of Temptation**
Each one is tempted when, by his own evil desire, he is dragged away and enticed. Notice: desire births sin, and sin, when full-grown, gives birth to death. Temptation is not an external attack only—it is an internal hook. Ask: what desire repeatedly drags me?

**Day 3 — Verses 16-18: The Good Giver**
"Every good and perfect gift is from above." When temptation whispers that God is withholding something good, this verse is the answer. Ask: what good thing am I wrongly trying to provide for myself?

**Day 4 — Verses 19-25: Doers, Not Hearers**
"Be quick to listen, slow to speak, and slow to become angry." The Word is a mirror, not just a map. A man who hears but does not act forgets his own face. Ask: what command am I currently ignoring?

**Day 5 — Verses 26-27: Religion That Works**
Pure religion controls the tongue, visits the vulnerable, and keeps unstained from the world. Ask: is my faith visible in how I speak and serve?

**Practice**
Memorize James 1:2-4 this week. Say it when pressure rises.`,
    category: 'study',
    duration: '20 min study',
    author: 'Iron Sharpens Iron',
    date: '2025-05-06',
    scripture: 'James 1',
    tags: ['bible study', 'temptation', 'trials', 'endurance', 'obedience'],
  },
  {
    id: 'study-galatians-5',
    title: 'Bible Study: Walk by the Spirit (Galatians 5)',
    excerpt: 'The war between flesh and Spirit, and the fruit that proves who is winning.',
    content: `Galatians 5 is the map of the Christian's internal war. Paul names the two armies and shows how the war is actually won.

**Day 1 — Verses 1-6: Freedom, Not Bondage**
"It is for freedom that Christ has set us free." Religious performance is a different prison from the old sin. Ask: am I trying to earn what I already have?

**Day 2 — Verses 7-15: The One Thing That Matters**
"The only thing that counts is faith expressing itself through love." Ask: where has my freedom become a license to wound or indulge?

**Day 3 — Verses 16-18: The Spirit-Led Walk**
"Walk by the Spirit, and you will not gratify the desires of the flesh." This is not willpower; it is a way of walking. Ask: what does my calendar reveal about what I am actually walking by?

**Day 4 — Verses 19-21: The Works of the Flesh**
Sexual immorality, impurity, fits of rage, selfish ambition. Read the list slowly. The flesh is not only sexual—it is self-serving in every form. Ask: which work of the flesh has most recently appeared in me?

**Day 5 — Verses 22-26: The Fruit of the Spirit**
Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. The fruit is singular: one Spirit producing one integrated character. Ask: which fruit is most lacking in my life right now?

**Application**
Pick one fruit of the Spirit. Ask God to grow it in you this week. Notice where it shows up and where it does not.`,
    category: 'study',
    duration: '18 min study',
    author: 'Iron Sharpens Iron',
    date: '2025-05-13',
    scripture: 'Galatians 5:16-26',
    tags: ['bible study', 'holy spirit', 'fruit of the spirit', 'flesh', 'self-control'],
  },
  {
    id: 'study-1corinthians-10',
    title: 'Bible Study: The Way of Escape (1 Corinthians 10)',
    excerpt: 'Israel\'s failures, your temptations, and the faithful promise that there is always a way out.',
    content: `Paul uses Israel's wilderness failures as a warning and a hope for the Corinthians—and for us.

**Day 1 — Verses 1-5: The Same Baptism, Different End**
All of Israel passed through the cloud and the sea, yet most fell in the wilderness. Privilege does not guarantee perseverance. Ask: what spiritual privileges do I take for granted?

**Day 2 — Verses 6-10: Four Traps**
Israel craved evil things, became idolaters, tested the Lord, and grumbled. Four heart postures: lust, idolatry, presumption, and complaint. Ask: which of these four is most active in my life right now?

**Day 3 — Verses 11-13: The Common Temptation**
"No temptation has overtaken you except what is common to mankind." Your struggle is not unique. And the promise: "He will not let you be tempted beyond what you can bear." Ask: do I actually believe God has set a limit on my temptation?

**Day 4 — Verses 14-22: Flee Idolatry**
"Flee from idolatry." Paul isn't only talking about statues. Idolatry is anything that shares the throne with Christ. Ask: what do I turn to for comfort, escape, or identity that isn't God?

**Day 5 — Verses 23-33: Do Everything for God's Glory**
"Whether you eat or drink or whatever you do, do it all for the glory of God." Freedom is not about your rights; it is about what edifies and what points people to Christ. Ask: what choice this week would be most glorifying to God?

**Action**
When temptation hits this week, say out loud: "God has provided a way of escape. Show me." Then move.`,
    category: 'study',
    duration: '20 min study',
    author: 'Iron Sharpens Iron',
    date: '2025-05-20',
    scripture: '1 Corinthians 10:1-13',
    tags: ['bible study', 'temptation', 'escape', 'idolatry', 'endurance'],
  },
  {
    id: 'study-proverbs-3',
    title: 'Bible Study: Trust in the Lord (Proverbs 3)',
    excerpt: 'A fatherly roadmap for wisdom, wealth, work, and walking straight.',
    content: `Proverbs 3 is one of the most practical chapters in Scripture. It reads like a father's final instructions before sending his son into the world.

**Day 1 — Verses 1-4: Remember and Keep**
"Do not forget my teaching, but keep my commands in your heart." Wisdom begins with memory. The promises are long life and peace, favor and a good name. Ask: what command of God have I been treating as optional?

**Day 2 — Verses 5-6: The Famous Verse**
"Trust in the Lord with all your heart and lean not on your own understanding." This is not anti-intellect; it is a call to submit your reasoning to God. Ask: what decision am I currently leaning on my own understanding for?

**Day 3 — Verses 7-8: Fear the Lord, Shun Evil**
"Do not be wise in your own eyes." Pride is the enemy of wisdom. The reward is health and strength to the body. Ask: what behavior do I need to shun—not manage, not reduce, but shun?

**Day 4 — Verses 9-12: Honor the Lord**
Honor God with your wealth. Don't resent His discipline. The Lord disciplines those He loves. Ask: what has God been teaching me lately that I have been resisting?

**Day 5 — Verses 13-35: The Blessing of Wisdom**
Wisdom is more valuable than silver, gold, or rubies. By wisdom the Lord laid the earth's foundations. The path of the wicked is like deep darkness, but the path of the righteous is like the morning sun. Ask: what is one practical area of my life that needs more wisdom this week?

**Application**
Write out Proverbs 3:5-6 on a card. Place it where you make decisions—your desk, your car, your wallet.`,
    category: 'study',
    duration: '18 min study',
    author: 'Iron Sharpens Iron',
    date: '2025-05-27',
    scripture: 'Proverbs 3',
    tags: ['bible study', 'wisdom', 'trust', 'proverbs', 'discipline'],
  },
  {
    id: 'study-hebrews-12',
    title: 'Bible Study: Running the Race (Hebrews 12)',
    excerpt: 'Throw off what hinders, fix your eyes on Jesus, and run with endurance.',
    content: `Hebrews 12 is the pep talk before the finish line. The writer has just listed the heroes of faith, and now he turns to the race in front of us.

**Day 1 — Verses 1-2: The Great Cloud of Witnesses**
"Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles." Ask: what is currently hindering me that I have been unwilling to name as hindering?

**Day 2 — Verses 3-11: The Discipline of the Father**
"The Lord disciplines the one he loves." Discipline is not rejection; it is proof of sonship. Ask: how do I respond to correction? With resentment or with surrender?

**Day 3 — Verses 12-13: Straight Paths**
"Make level paths for your feet." A lame man who keeps walking gets stronger. A runner who clears the path runs farther. Ask: what needs to be straightened in my life so that I do not fall?

**Day 4 — Verses 14-17: Pursue Peace and Holiness**
"Without holiness no one will see the Lord." See to it that no one falls short of God's grace. Esau is the warning: do not trade your birthright for a single meal. Ask: what "single meal" am I tempted to trade everything for?

**Day 5 — Verses 18-29: The Unshakeable Kingdom**
We have come to Mount Zion, not Mount Sinai. The kingdom we receive cannot be shaken. Ask: does my daily life reflect that I am part of an unshakeable kingdom?

**Practice**
This week, read Hebrews 12:1-2 every morning before you pick up your phone.`,
    category: 'study',
    duration: '20 min study',
    author: 'Iron Sharpens Iron',
    date: '2025-06-03',
    scripture: 'Hebrews 12:1-29',
    tags: ['bible study', 'endurance', 'discipline', 'holiness', 'perseverance'],
  },
  {
    id: 'study-ephesians-4',
    title: 'Bible Study: Put Off, Renew, Put On (Ephesians 4)',
    excerpt: 'The three-step process of real transformation: take off the old, renew the mind, put on the new.',
    content: `Ephesians 4 is the hinge between theology and practice. Paul moves from the riches of our identity in Christ to the specific putting-off and putting-on of daily life.

**Day 1 — Verses 1-6: Walk Worthy of the Calling**
"Live a life worthy of the calling you have received." The calling is the foundation; the walk is the evidence. Ask: what would a life worthy of my calling look like in the places only God sees?

**Day 2 — Verses 17-19: The Old Self**
"Put off your old self." The Gentile walk is futile, darkened, and separated from God. Ask: what old patterns still feel "natural" to me that are actually futile?

**Day 3 — Verses 20-24: The Pattern of Renewal**
"You were taught, with regard to your former way of life, to put off your old self, to be made new in the attitude of your minds, and to put on the new self." Transformation is not one decision; it is a pattern: off, renew, on. Ask: what old self do I need to put off today? What new self do I need to put on?

**Day 4 — Verses 25-32: Specific Instructions**
Put off falsehood; speak truth. Put off anger; resolve quickly. Don't let the sun go down. Don't steal; work and share. Don't let unwholesome talk come out. Get rid of bitterness and rage. Be kind and compassionate. Forgive. Ask: which of these specific commands is the most urgent in my life right now?

**Day 5 — Verses 1-32 Review**
Read the whole chapter again. The Christian life is a putting-off and a putting-on, empowered by the Spirit. Write one sentence: "Because of who I am in Christ, I will no longer ___, and I will instead ___."

**Application**
Make a "put off / put on" chart for the week. Track one specific behavior you are replacing.`,
    category: 'study',
    duration: '22 min study',
    author: 'Iron Sharpens Iron',
    date: '2025-06-10',
    scripture: 'Ephesians 4:17-32',
    tags: ['bible study', 'transformation', 'renewal', 'identity', 'put off'],
  },
  {
    id: 'study-1peter-5',
    title: 'Bible Study: Standing Firm in the True Grace (1 Peter 5)',
    excerpt: 'Leadership, humility, vigilance, and the God who restores after suffering.',
    content: `Peter closes his letter with practical marching orders for a suffering church. The chapter is for every man who is tired of being on guard and needs a reminder of the God who guards him.

**Day 1 — Verses 1-4: Shepherd the Flock**
"Be shepherds of God's flock that is under your care." Leadership is stewardship, not ownership. It is service, not status. Ask: who has God placed under my care, and how am I shepherding them?

**Day 2 — Verses 5-7: Clothe Yourself with Humility**
"Clothe yourselves with humility toward one another." Humility is a garment you put on, not a mood you feel. "Cast all your anxiety on him because he cares for you." Ask: what anxiety have I been carrying that I need to cast on God today?

**Day 3 — Verses 8-9: Be Alert**
"Be alert and of sober mind. Your enemy the devil prowls around like a roaring lion." He roars to create fear; he devours when he finds you passive. Resist him, standing firm in the faith. Ask: where have I become passive or asleep in my fight?

**Day 4 — Verses 10-11: The God of All Grace**
"And the God of all grace, who called you to his eternal glory in Christ, after you have suffered a little while, will himself restore you and make you strong, firm and steadfast." Suffering is temporary; restoration is guaranteed. Ask: do I believe God will restore me, or do I feel like it is up to me?

**Day 5 — Verses 12-14: Final Encouragement**
"Stand fast in the true grace of God." The true grace is not a license; it is the power to stand. Ask: what does standing fast look like for me this week?

**Practice**
Memorize 1 Peter 5:8-9. When you feel the pressure to compromise, say it aloud as a declaration of war.`,
    category: 'study',
    duration: '18 min study',
    author: 'Iron Sharpens Iron',
    date: '2025-06-17',
    scripture: '1 Peter 5',
    tags: ['bible study', 'spiritual warfare', 'humility', 'restoration', 'alertness'],
  },
  {
    id: 'article-warriors-prayer-life',
    title: 'A Warrior\'s Prayer Life: Beyond the Checklist',
    excerpt: 'Move past rote prayers and build a real conversation with God that changes your day.',
    content: `Many men pray like they check email—quickly, efficiently, and hoping there are no new demands. But prayer is not a task to complete; it is the lifeline that keeps a warrior standing.

**The Danger of Ritual Prayer**
When prayer becomes a ritual, it loses its power. Jesus warned against empty phrases and long prayers for show (Matthew 6:7-8). The goal is not length but connection. A five-minute prayer with real attention is more powerful than a twenty-minute monologue that checks a box.

**Move from Monologue to Dialogue**
Try this simple shift: after you speak to God, sit in silence for one minute. Ask, "Lord, what do You want to say to me?" Most men never hear from God because they never stop talking. The Bible is full of men who built altars and then listened.

**Prayer as a Weapon**
Paul tells the Ephesians to pray "on all occasions with all kinds of prayers and requests" (Eph. 6:18). Prayer is part of the armor. When temptation rises, the first move is not willpower; it is prayer. Even a desperate "Help me, Jesus" can break a stronghold.

**Practical Daily Pattern**
- **Morning:** Surrender the day before you touch your phone.
- **Midday:** One breath prayer during a transition or break.
- **Evening:** Review the day with God, confess what needs confessing, and give thanks.

**Action Step:**
Set a 5-minute timer tomorrow morning. No agenda. Just show up and talk to God like He is real. Because He is.`,
    category: 'article',
    duration: '6 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-06-24',
    scripture: 'Ephesians 6:18',
    tags: ['prayer', 'spiritual disciplines', 'listening', 'warrior'],
  },
  {
    id: 'article-stewardship-of-the-eyes',
    title: 'Guarding the Gates: Stewardship of the Eyes',
    excerpt: 'Why what you choose to look at shapes who you become, and how to build better boundaries.',
    content: `David did not plan to fall. He was a man after God's own heart, yet one casual glance from the palace roof led to adultery, murder, and national tragedy. The eyes are gates, and what you allow through them determines the direction of your soul.

**The Science of Sight**
Your brain forms neural pathways around what you repeatedly see. Repeated exposure to sexualized or violent imagery rewires desire, dulls conscience, and creates cravings. You are not weak for struggling; you are human. But you are responsible for what you feed that humanity.

**Make the First Cut**
The best defense is often the simplest: remove the source. Unfollow accounts. Block websites. Move the TV. Keep the phone out of the bedroom. Radical amputation is not paranoia; it is wisdom. Jesus said if your eye causes you to stumble, pluck it out (Matthew 5:29). He was speaking in hyperbole, but the principle is dead serious.

**Fill the Void**
You cannot just remove; you must replace. When you stop filling your eyes with trash, fill them with truth:
- Scripture
- Nature
- Good books
- Healthy friendships
- Purposeful work

**The Bounce Principle**
When an unwanted image crosses your path, practice the bounce: look away immediately, do not linger, and offer a prayer of protection. The second look is where the battle is lost.

**Accountability for Screens**
Use filters, but do not rely on them. Share your passwords or browsing history with a trusted brother. The man who hides his screen has already lost part of the war.

**Action Step:**
Audit every app and subscription this week. Ask: "Does this help me become the man God is calling me to be?" If the answer is no, delete it.`,
    category: 'article',
    duration: '7 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-07-01',
    scripture: 'Matthew 5:29',
    tags: ['purity', 'boundaries', 'stewardship', 'digital detox'],
  },
  {
    id: 'article-anger-and-righteousness',
    title: 'Righteous Anger: Using Fire Without Getting Burned',
    excerpt: 'Not all anger is sin. Learn to tell the difference and channel holy anger toward justice.',
    content: `Anger is one of the most misunderstood emotions in the Christian life. Many men grow up believing all anger is bad, so they either suppress it until it explodes or deny it until it turns to bitterness. But Jesus got angry. He flipped tables. He called out hypocrisy. The issue is not anger itself; it is what you do with it.

**Two Kinds of Anger**
- **Righteous anger** grieves over sin, injustice, and the harm done to others. It is slow, controlled, and aimed at restoration.
- **Unrighteous anger** protects the ego, demands control, and seeks revenge. It is quick, hot, and destructive.

**The Test of Your Anger**
Ask yourself three questions:
1. Is this about God's honor or my comfort?
2. Does this anger move me toward love or toward punishment?
3. Will I still be angry after I pray?

**Paul's Instruction**
"In your anger do not sin. Do not let the sun go down while you are still angry." — Ephesians 4:26-27. Anger is not a sin, but it becomes one when you hold it overnight, feed it, or act on it foolishly.

**What to Do With It**
- Name it honestly before God.
- Ask what wound or value it is protecting.
- Confess it if it crosses into sin.
- Channel it into prayer, justice, or protection of the vulnerable.

**Action Step:**
The next time you feel anger rising, pause before speaking. Ask: "Is this the fire that cleans, or the fire that destroys?" Then act accordingly.`,
    category: 'article',
    duration: '6 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-07-08',
    scripture: 'Ephesians 4:26',
    tags: ['anger', 'emotions', 'righteousness', 'self-control'],
  },
  {
    id: 'article-fatherhood-and-faith',
    title: 'Leading Little Disciples: Fatherhood as a Mission Field',
    excerpt: 'Your children are watching. How your faith shapes the next generation starts today.',
    content: `Fatherhood is one of the most powerful discipleship opportunities a man will ever have. Your children will not remember every sermon you hear, but they will remember whether you prayed, apologized, and kept showing up. They are reading your life more than your words.

**Model, Don't Perform**
Kids detect hypocrisy faster than anyone. Do not pretend to have it all together. Let them see you repent. Let them hear you ask God for help. Let them watch you forgive. A father who is real about his walk with God is more powerful than one who performs perfection.

**Daily Rhythms**
- **Pray with them** at bedtime, not just over meals.
- **Read one verse** together at breakfast and ask, "What do you think this means?"
- **Apologize quickly** when you lose your temper. This teaches grace.
- **Serve together** as a family. Generosity is caught more than taught.

**Discipline With Grace**
Your children need boundaries, not cruelty. Correct with the goal of restoration, not venting your frustration. The way you discipline reveals what you believe about God the Father.

**Passing the Baton**
Deuteronomy 6:6-7 says to impress God's commands on your children when you sit, walk, lie down, and get up. Faith is not a Sunday event; it is a lifestyle that fills the ordinary moments.

**Action Step:**
This week, choose one ordinary moment—bedtime, breakfast, or the car ride home—and make it a place where God is named. Start small. Stay consistent.`,
    category: 'article',
    duration: '6 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-07-15',
    scripture: 'Deuteronomy 6:6-7',
    tags: ['fatherhood', 'family', 'discipleship', 'legacy'],
  },
  {
    id: 'article-financial-freedom',
    title: 'Money and Masculinity: Breaking the Chains of Financial Stress',
    excerpt: 'How to handle money like a steward, not an owner, and free yourself from anxiety.',
    content: `Money is one of the greatest sources of anxiety for men. It can feel like a scorecard, a security blanket, or a weapon. But the Bible says we are managers, not owners. The moment you believe your money is truly yours, you have already begun to worship it.

**The Lie of Enough**
Most men think, "If I just had a little more, then I would be at peace." But peace does not come from accumulation. It comes from trust. Contentment is the secret weapon: "I have learned to be content whatever the circumstances" (Philippians 4:11).

**Three Foundational Habits**
1. **Give first.** Before you spend or save, honor God with the first portion. This reminds you that everything is His.
2. **Save second.** Build an emergency fund. Proverbs 6:6-8 praises the ant for storing provision in season. Wisdom prepares.
3. **Spend last.** Live within your means. Debt is not just a financial issue; it is a freedom issue.

**Avoiding the Comparison Trap**
Social media makes every man feel like he is behind. You are not behind; you are on your own path. The only scorecard that matters is faithfulness, not net worth.

**Generosity Breaks Greed**
When you feel anxiety about money, give something away. Generosity loosens greed's grip. It reminds your heart that you can survive without everything you think you need.

**Action Step:**
Write down every subscription and recurring expense this month. Cancel one thing you do not need. Then give that amount to a cause that honors God.`,
    category: 'article',
    duration: '7 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-07-22',
    scripture: 'Philippians 4:11',
    tags: ['finances', 'stewardship', 'generosity', 'anxiety'],
  },
  {
    id: 'article-overcoming-shame',
    title: 'Shame vs. Conviction: Know the Difference',
    excerpt: 'One leads to hiding; the other leads to healing. Learn which voice you are listening to.',
    content: `Every man who has struggled with sin knows the voice of shame. It whispers, "You are disgusting. You will never change. If people knew, they would leave." But shame is not from God. The Holy Spirit brings conviction, not condemnation. Knowing the difference is the difference between life and death.

**Shame Says:**
- You are bad.
- Hide.
- Punish yourself.
- Give up.

**Conviction Says:**
- That choice was wrong.
- Come into the light.
- Confess and be cleansed.
- Try again.

**The Enemy's Weapon**
Shame is the enemy's replay button. He uses your past to sabotage your future. He wants you to believe that your sin is your identity. But your identity is not "addict," "failure," or "hypocrite." Your identity is "beloved son of God."

**The Antidote**
The antidote to shame is not self-esteem; it is the gospel. Romans 8:1 says, "There is now no condemnation for those who are in Christ Jesus." When shame speaks, answer it with truth. Say out loud: "I am forgiven. I am clean. I am being transformed."

**Bring It Into the Light**
Shame dies in community. The longer you keep your struggle hidden, the stronger it becomes. Confession to a trusted brother is not weakness; it is spiritual warfare. "Confess your sins to each other and pray for each other so that you may be healed" (James 5:16).

**Action Step:**
When shame speaks today, write the lie down. Next to it, write the truth from Scripture. Then tell one trusted person about the lie. Watch how it loses its power.`,
    category: 'article',
    duration: '6 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-07-29',
    scripture: 'Romans 8:1',
    tags: ['shame', 'conviction', 'gospel', 'vulnerability'],
  },
  {
    id: 'article-work-as-worship',
    title: 'Work as Worship: Bringing God into Your Calling',
    excerpt: 'Your job is more than a paycheck. It is an arena where faithfulness can be offered to God.',
    content: `For many men, work is a separate compartment from faith. Church is spiritual; work is practical. But the Bible has no such divide. Colossians 3:23 says, "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." Your cubicle, your truck, your classroom, your kitchen—each is a place of worship.

**The Dignity of Work**
Work existed before the fall. Adam was placed in the garden to work it and take care of it. Your work matters to God because He designed you to contribute, create, and provide.

**Three Marks of Worshipful Work**
1. **Excellence.** Mediocre work is not neutral. When you do your work well, you honor the One who gave you the ability.
2. **Integrity.** Refuse shortcuts, lies, gossip, and compromise. The man who is faithful in small things is faithful in much.
3. **Service.** Even in a competitive workplace, you can serve others. Hold the door, answer kindly, share credit, and treat people like image-bearers of God.

**When Work Is Hard**
Not every job is fulfilling. Some seasons are survival. But even in a difficult job, you can offer faithfulness. Do not despise small beginnings. Joseph spent years in slavery and prison before leadership. Daniel served a pagan king with excellence. Your current job may be preparation, not punishment.

**Work-Life Balance**
Work is not your life. Do not sacrifice your family, health, or soul on the altar of ambition. The Sabbath is not a suggestion; it is a command. Rest is where you remember that God is the provider, not you.

**Action Step:**
Choose one task at work this week and do it as if Jesus were your supervisor. Notice how it changes your attitude, effort, and sense of purpose.`,
    category: 'article',
    duration: '6 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-08-05',
    scripture: 'Colossians 3:23',
    tags: ['work', 'calling', 'worship', 'excellence'],
  },
  {
    id: 'article-silence-and-solitude',
    title: 'The Lost Discipline of Silence and Solitude',
    excerpt: 'In a noisy world, the ability to be alone with God is a superpower.',
    content: `We live in the noisiest era in human history. Notifications, podcasts, music, videos, and endless scrolling fill every quiet moment. Many men are terrified of silence because silence forces them to face what they have been running from. But silence is where God often speaks the loudest.

**Jesus Practiced Solitude**
Mark 1:35 says, "Very early in the morning, while it was still dark, Jesus got up, left the house and went off to a solitary place, where he prayed." If the Son of God needed solitude, how much more do we?

**Why It Is Hard**
Silence reveals the chaos underneath. When you stop numbing, you start feeling. Boredom, loneliness, anxiety, and old wounds surface. But that surfacing is not the enemy. It is the opportunity. God wants to meet you there.

**How to Start**
You do not need a cabin in the woods. Start with ten minutes.
- Turn off every device.
- Sit in a quiet place.
- Breathe deeply.
- Read a short Scripture.
- Ask God, "What do You want me to hear today?"
- Wait. Do not rush.

**What You May Discover**
In silence, you may hear conviction, comfort, direction, or simply the reminder that you are loved. Sometimes God speaks through a word, a memory, or a nudge. Sometimes He simply gives you His presence.

**Action Step:**
This week, schedule one 20-minute silence appointment. Treat it like a meeting with the most important person in your life. Because it is.`,
    category: 'article',
    duration: '6 min read',
    author: 'Iron Sharpens Iron',
    date: '2025-08-12',
    scripture: 'Mark 1:35',
    tags: ['silence', 'solitude', 'spiritual disciplines', 'stillness'],
  },
];

export const getTodaysDevotional = (): DevotionalArticle => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return devotionalContent[dayOfYear % devotionalContent.length];
};

// Get devotionals by category
export const getDevotionalsByCategory = (category: DevotionalArticle['category']): DevotionalArticle[] => {
  return devotionalContent.filter(item => item.category === category);
};

// Get featured devotionals (first 3)
export const getFeaturedDevotionals = (): DevotionalArticle[] => {
  return devotionalContent.slice(0, 3);
};

// Search devotionals by tag
export const searchDevotionalsByTag = (tag: string): DevotionalArticle[] => {
  return devotionalContent.filter(item => 
    item.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
};

// Deterministic shuffle based on a numeric seed
const seededShuffle = <T,>(items: T[], seed: number): T[] => {
  const result = [...items];
  let s = seed;
  const next = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const getDayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor((now.getTime() - start.getTime()) / oneDay);
};

// A fresh, rotating selection of content for today
export const getDailyRotation = (count = 6): DevotionalArticle[] =>
  seededShuffle(devotionalContent, getDayOfYear() + 1).slice(0, count);

// A random selection (used by the Shuffle button)
export const getRandomDevotionals = (count = 6): DevotionalArticle[] =>
  seededShuffle(devotionalContent, Math.floor(Math.random() * 1000000) + 1).slice(0, count);

// Full library in a rotating order so the grid feels fresh each day
export const getRotatedLibrary = (): DevotionalArticle[] =>
  seededShuffle(devotionalContent, getDayOfYear() + 7);
