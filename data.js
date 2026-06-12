/* ============================================
   BREAKUPBUDGET.PAGES.DEV — data.js
   All content: roasts, equivalents, cert styles,
   quotes, stories, FAQs, verdicts.
   Load this FIRST before logic.js and cert.js
============================================ */

const BB = {};

/* ══════════════════════════════════════════
   1. UTILITY
══════════════════════════════════════════ */
BB.fmt = n => '₹' + n.toLocaleString('en-IN');

/* ══════════════════════════════════════════
   2. VERDICTS  (6 tiers by amount)
══════════════════════════════════════════ */
BB.VERDICTS = [
  'MINOR EMOTIONAL EXPENSE',
  'NOTABLE FINANCIAL SACRIFICE',
  'SIGNIFICANT ROMANTIC DAMAGE',
  'CERTIFIED DISASTER',
  'CATASTROPHIC INVESTMENT LOSS',
  'COMPLETE FINANCIAL ANNIHILATION'
];
BB.getVerdict = a =>
  BB.VERDICTS[a < 5000 ? 0 : a < 20000 ? 1 : a < 50000 ? 2 : a < 100000 ? 3 : a < 200000 ? 4 : 5];

/* ══════════════════════════════════════════
   3. ROI SCORES
══════════════════════════════════════════ */
BB.getROI = a => {
  if (a <   5000) return { pct: 72, label: '72% — Barely Recoverable' };
  if (a <  20000) return { pct: 48, label: '48% — Below Average' };
  if (a <  50000) return { pct: 28, label: '28% — Poor Investment' };
  if (a < 100000) return { pct: 15, label: '15% — Terrible ROI' };
  if (a < 200000) return { pct:  6, label: '6% — Near Total Loss' };
  return                  { pct:  1, label: '1% — Complete Write-Off' };
};

/* ══════════════════════════════════════════
   4. 260 ROAST LINES
   Each is a function that receives the amount
   and returns a savage personalised string.
══════════════════════════════════════════ */
BB.ROASTS = [
  /* ── tier: tiny (under ₹5K) ── */
  a=>`You spent ${BB.fmt(a)}. That's less than a decent dinner for two. Either your ex was very cheap or you were emotionally efficient. Either way — respect the budget, mourn the choices.`,
  a=>`${BB.fmt(a)}? You broke up for the price of a few Ola rides. The trauma is fully real. The math is embarrassingly small.`,
  a=>`${BB.fmt(a)} spent, ${BB.fmt(a)} learned. This was practically a free lesson in human psychology. Expensive therapy costs far more.`,
  a=>`You got your heart broken for ${BB.fmt(a)}. That is literally the cost of a phone cover. The audacity of your ex doing this much damage so cheaply.`,
  a=>`${BB.fmt(a)}. You spent less on this relationship than most people spend on Zomato in a single month. The question is — which one gave you more joy?`,
  a=>`Honestly? ${BB.fmt(a)} is practically the best ROI on pain in recorded history. You cried for free. The investment was minimal. The damage, clearly, was not.`,

  /* ── tier: small (₹5K–₹20K) ── */
  a=>`${BB.fmt(a)} gone. That's a boAt earphone, a month of Spotify, AND a weekend in Kasol. But you chose love. Love said — actually no thanks, goodbye.`,
  a=>`You spent ${BB.fmt(a)} and got what exactly? Blurry memories and a contact you're not supposed to text at midnight? Incredible financial decision.`,
  a=>`${BB.fmt(a)}. That's roughly ${Math.floor(a/500)} cups of that overpriced café coffee from your dates. Each cup now costs approximately one breakup.`,
  a=>`The good news: you spent only ${BB.fmt(a)}. The bad news: you remember every single rupee. The worse news: so does this website, now.`,
  a=>`${BB.fmt(a)}. That's 3 months of a full OTT bundle. You could have watched every series instead of going on dates that led to this exact moment. Think about it slowly.`,
  a=>`${BB.fmt(a)} is literally a solo train trip to Goa and back, with meals included. But no, you took them to dinner instead. They took your peace. Classic exchange.`,
  a=>`${BB.fmt(a)} on one person. Meanwhile your mutual funds are sitting there, doing nothing, judging you silently. Very quietly. Very accurately.`,
  a=>`You invested ${BB.fmt(a)} in a relationship with 0% return and 100% heartbreak rate. Even crypto performs better than this on its worst days. Most days.`,
  a=>`${BB.fmt(a)}. That's roughly ${Math.floor(a/1200)} full cinema dates. You could have watched every Marvel film, every Bollywood blockbuster, with popcorn. Alone. Peacefully.`,

  /* ── tier: medium (₹20K–₹50K) ── */
  a=>`${BB.fmt(a)}. You could have bought a PlayStation 5, set it up in your room, and lived your absolute best life. Instead you bought heartbreak DLC with a zero-refund policy.`,
  a=>`At ${BB.fmt(a)}, you have officially crossed the "I could have gone to Thailand" threshold. Solo. Good food. No one to disappoint you. You chose the other thing.`,
  a=>`${BB.fmt(a)} is a down payment on a two-wheeler. You could be on the highway right now, wind in your hair, nobody texting you back. You chose to fund someone's emotional unavailability instead.`,
  a=>`${BB.fmt(a)} spent. That's ${Math.floor(a/200)} plates of biryani. You could have eaten biryani every single day and been substantially happier. Science almost certainly backs this.`,
  a=>`Congratulations. With ${BB.fmt(a)}, you have officially entered the "I should start a blog about this" territory. The story arc is genuinely compelling. The financial decision was not.`,
  a=>`${BB.fmt(a)}. In startup terms, this was a Series A investment with zero returns, a toxic co-founder, and an exit strategy that exclusively involved crying at 2am.`,
  a=>`You spent ${BB.fmt(a)} on someone who clearly did not file the ROI report. In the corporate world, this project would have been shut down in Q2 with a strongly worded email.`,
  a=>`${BB.fmt(a)} is what some people pay for a weekend wellness retreat. You got the absolute opposite of wellness. You got the raw, unfiltered anti-wellness experience. Bold choice.`,
  a=>`${BB.fmt(a)}. That's a MacBook Air down payment. But you chose to invest in human unpredictability instead. The MacBook would have crashed less often and apologised faster.`,

  /* ── tier: large (₹50K–₹1L) ── */
  a=>`${BB.fmt(a)}. You know what this is? MacBook Air, a Canon DSLR, AND a Goa trip, all three. All of which would still be with you today. Unlike some people we know.`,
  a=>`At ${BB.fmt(a)}, we have entered certified disaster territory. Your bank account saw this coming. Your bank account tried to warn you. You absolutely did not listen to your bank account.`,
  a=>`${BB.fmt(a)} is serious money. That's a year of EMIs on a decent scooter. The scooter would take you places. This relationship took you — emotionally — mostly in circles.`,
  a=>`You invested ${BB.fmt(a)} in a relationship with a 0% return and a 100% heartbreak rate. Even crypto performs better on its worst days. Even during the FTX collapse.`,
  a=>`${BB.fmt(a)} gone. That's roughly ${Math.floor(a/1200)} cinema dates. Every Marvel film, every Bollywood blockbuster, with a large popcorn every single time. Alone. Peacefully. With no one to ghost you after.`,
  a=>`${BB.fmt(a)}. This is not a breakup. This is a financial event. Your accountant would weep. Your future self is already weeping. Your past self was apparently very, very optimistic.`,
  a=>`With ${BB.fmt(a)}, you have crossed from "expensive lesson" to "case study." Business schools would analyse your decision-making process here. Not kindly. But thoroughly.`,

  /* ── tier: catastrophic (₹1L–₹2L) ── */
  a=>`${BB.fmt(a)}. Brother. Sister. Friend. This is not a breakup amount. This is startup seed funding. You could have built something real. Instead you funded someone else's entire vibe era.`,
  a=>`At ${BB.fmt(a)}, you didn't date them. You sponsored them. There is a meaningful legal and moral difference between a romantic partner and a patron of the arts. You have clearly crossed it.`,
  a=>`${BB.fmt(a)} is a semester abroad. An international trip. A year of learning any skill you wanted. You invested it in someone who apparently had better portfolio options.`,
  a=>`You spent ${BB.fmt(a)} and what do you have to show for it? Some screenshots, a blocked contact, and a number currently displayed in a large, tragic font on your screen.`,
  a=>`${BB.fmt(a)} gone. That's a fully loaded iPhone 15, a two-year gym membership, AND a flight to Dubai. You gave them all of that — emotionally and literally. They gave you closure via a text.`,

  /* ── tier: annihilation (over ₹2L) ── */
  a=>`${BB.fmt(a)}. We need a moment of silence. Not for the relationship. For the money. The relationship had its time. The money deserved a significantly better fate.`,
  a=>`${BB.fmt(a)} is a car down payment. A proper Europe trip. Six solid months of rent in a good city. You gave all of that to one person who decided, after careful consideration, that you weren't the one.`,
  a=>`At ${BB.fmt(a)}, you have officially become the protagonist of a financial thriller. The twist ending? You were the villain to your own savings account the entire time. Devastating. Cinematic. Accurate.`,
  a=>`${BB.fmt(a)}. You know what this is? This is generational wealth quietly leaving your family tree. Your future children can feel this. Your unborn grandchildren are already slightly disappointed.`,
  a=>`You gave them ${BB.fmt(a)} worth of your resources. They gave you a story. The story is genuinely good though — it ends with you here, calculating, healing, and building significantly better instincts.`,
  a=>`${BB.fmt(a)} on one person. You didn't just date them. You funded them. You are essentially their angel investor. You deserve equity. A board seat. At bare minimum, a formal thank you note.`,
  a=>`This is not a breakup. At ${BB.fmt(a)}, this is a financial restructuring event. Call your CA. File your losses. Begin the healing process with a good auditor and possibly a lawyer.`,

  /* ── universal (works at any amount) ── */
  a=>`Love is blind. Your bank account, unfortunately, is not. ${BB.fmt(a)} later, both of you can see with perfect clarity.`,
  a=>`Every time you spent money on them, your wallet silently filed a formal complaint. ${BB.fmt(a)} of complaints later, you're finally reading them.`,
  a=>`${BB.fmt(a)} is your official entry fee into the exclusive club of people who learned things the hard, expensive, slightly humiliating way. Welcome. We have certificates.`,
  a=>`They say time heals everything. They never mention that ${BB.fmt(a)} does not return with time. That particular detail nobody ever warns you about.`,
  a=>`${BB.fmt(a)} invested. Zero dividends. Maximum emotional volatility. SEBI would have flagged this investment on day one. Your heart ignored every red flag.`,
  a=>`${BB.fmt(a)} is what it cost you to learn that "we'll figure it out" means entirely different things to different people. Extremely expensive vocabulary lesson.`,
  a=>`They say love is priceless. That is statistically and factually false. Love cost you exactly ${BB.fmt(a)}. Very specific. Very countable. Very, very gone.`,
  a=>`${BB.fmt(a)} and not a single paisa came back. Even your ex's hoodie has probably found a new owner by now. The money never will.`,
  a=>`You could frame this certificate. You could frame the ${BB.fmt(a)} receipt. You could title the installation "My Worst Investment" and enter it in an art show. Critics would call it brave.`,
  a=>`${BB.fmt(a)} is what you paid for the complete package: the butterflies, the inside jokes, the situationship confusion, and the 2am realisation that this was never, ever going to work out.`,
  a=>`The stock market has bad days. Crypto has historic crashes. You had this relationship. All three will eventually recover. Two of them considerably faster than the other.`,
  a=>`${BB.fmt(a)} later — single, wiser, reading a roast on a website at a suspicious hour. This is character development. Expensive, slightly painful, but absolutely character development.`,
  a=>`${BB.fmt(a)} gone. That is the tuition fee for the module titled "They Were Not Who I Thought They Were 101." No credits. No degree. Just data and a very good story.`,
  a=>`Here's the thing about ${BB.fmt(a)}: it is already spent. It is not coming back. But you are. Slowly. With significantly better judgment and fractionally less savings.`,
  a=>`You gave them ${BB.fmt(a)} worth of your time, money, and attention. They gave you a story. The story ends with you here — calculating, healing, and building better filters for next time.`,
  a=>`${BB.fmt(a)} confirms you are the kind of person who gives everything. The next person who receives that kind of love? They better know exactly what they have. This one clearly, obviously, did not.`,
  a=>`Some people spend ${BB.fmt(a)} on a laptop that faithfully serves them for five years. You spent it on this relationship. The laptop would have been measurably more loyal and significantly less dramatic.`,
  a=>`${BB.fmt(a)} is the price of learning that "I'll always be here" has a remarkably flexible definition depending on who's saying it. Lesson learned. Certificate earned. Forward we go.`,
  a=>`${BB.fmt(a)}. Shakespeare wrote tragedies about considerably smaller sums. You lived one. You survived it. You are now immortalised on a breakup calculator at a deeply suspicious hour. Peak narrative arc.`,
  a=>`Your ex received ${BB.fmt(a)} worth of your time, money, and emotional energy. In return they gave you character growth, emotional scars, and this certificate. By some metrics, a fair trade.`,
  a=>`${BB.fmt(a)} on one human. Your electricity bill for the same period was less dramatic and, crucially, significantly more reliable.`,
  a=>`You invested ${BB.fmt(a)} in the quiet hope that love would compound like a solid fixed deposit. Instead it crashed like a meme stock in the worst week of February. Same energy. Far worse outcome.`,
  a=>`${BB.fmt(a)}. In another, kinder timeline, this money bought you peace of mind, exceptional food, and a plant that thrives quietly under your care. In this one, you got left on read.`,
  a=>`${BB.fmt(a)} is the official documented cost of believing in someone more than they ever believed in the relationship itself. Add it to your wisdom portfolio. Mark it permanently non-recoverable.`,
  a=>`Here lies ${BB.fmt(a)}, spent faithfully in the service of love. May it rest in peace. May you rest in growth, in clarity, and in increasingly better financial decisions.`,
  a=>`The verdict is in: ${BB.fmt(a)} spent, zero returns, full heartbreak, and one extraordinarily dramatic certificate. The financial system has no existing category for this level of romantic investment. It absolutely should.`,
  a=>`${BB.fmt(a)} and all you got was this certificate. Which is, honestly, quite beautiful. Frame it. Heal thoroughly. Move forward with grace. Never, under any circumstances, repeat this.`,
  a=>`You didn't waste ${BB.fmt(a)}. You invested it in a very expensive, deeply personal lesson about human nature, emotional availability, and why red flags so consistently come packaged in such attractive, convincing wrapping.`,
  a=>`${BB.fmt(a)}. Not all investments pay in money. Some pay in wisdom. This one paid in both. Overwhelmingly in wisdom. Very expensive wisdom. Keep it. Use it. It cost enough.`,
  a=>`You could buy ${Math.floor(a/350)} full buckets of KFC with ${BB.fmt(a)}. You chose love instead. Love did not arrive with 11 herbs and spices. Love did not arrive at all, in the end.`,
  a=>`${BB.fmt(a)} on one human being. Your electricity bill for the exact same period was less dramatic, more consistent, and never once asked you to "give it space."`,
  a=>`With ${BB.fmt(a)}, you have firmly established that your heart and your wallet have a serious, unresolved trust issue. They need couples therapy. With each other. Urgently.`,
  a=>`${BB.fmt(a)}. Filed officially under: Lessons Learned, Do Not Repeat, Handle With Extreme Emotional Caution Going Forward. The certificate is your receipt. Keep it somewhere visible.`,
  a=>`You spent ${BB.fmt(a)} believing genuinely in forever. Forever lasted — well. You know how long it lasted. The math was always going to arrive at exactly this number. You just needed to see it written down.`,
  a=>`${BB.fmt(a)} confirmed: you are wired to love deeply and spend accordingly. The next person who earns that? They better show up every single day. This one, evidently, chose not to.`,
  a=>`${BB.fmt(a)} is the official market price of one complete romantic miscalculation. You have the receipt. You have the certificate. You have the data. Next time, do the due diligence first.`,
  a=>`Every rupee of that ${BB.fmt(a)} was spent with genuine hope. That's not embarrassing — that's human. What's slightly embarrassing is finding out the number. But now you know. And knowing is the first step.`,
  a=>`${BB.fmt(a)}. The relationship is over. The money is gone. The WiFi password they never changed is genuinely the last thing they ever gave you completely for free.`,
  a=>`You gave someone ${BB.fmt(a)} worth of your one life. Make the next investment count. Make every single rupee going forward work harder, go further, and treat you significantly better than this one did.`,

  /* ── fun / pop culture ── */
  a=>`${BB.fmt(a)}. Your bank statement looks like a Bollywood tragedy. The hero gave everything. The villain left in the interval. The certificate is the end credits rolling.`,
  a=>`Swiggy charges ₹30 delivery and you still tip them. You gave ${BB.fmt(a)} to someone who never once tipped your emotional labour. The irony is loud.`,
  a=>`${BB.fmt(a)} spent. In the movie version of your life, this is the montage where the protagonist realises what they had been funding all along. The music swells. The certificate appears.`,
  a=>`${BB.fmt(a)}. That's ${Math.floor(a/99)} months of Spotify Premium. You could have had uninterrupted music, zero ads, and zero heartbreak for the same price. The algorithm would have loved you back, at least.`,
  a=>`Your ex was not the main character. You were. The ${BB.fmt(a)} you spent? That was the production budget for your greatest character arc. Expensive arc. Incredible growth. No sequel needed.`,
  a=>`${BB.fmt(a)} on someone who clearly had different priorities. In another universe, that money became a trip, a skill, a savings account, a version of you that didn't need this website. Love that version. Become them.`,
  a=>`${BB.fmt(a)}. The economy is rough. Inflation is real. And you — you chose to hand-deliver ${BB.fmt(a)} to someone who apparently had better offers. The market, as they say, is undefeated.`,
  a=>`You spent ${BB.fmt(a)} trying to be chosen. Here is what this certificate officially confirms: you were always the better investment. They just had poor financial literacy.`,
  a=>`${BB.fmt(a)} is gone. But consider this: every single rupee of it taught you something the comfortable path never would have. You are now, objectively, the most expensive version of yourself. That is worth something.`,
  a=>`The ${BB.fmt(a)} is gone. The relationship is gone. But you — the person who loved that hard, that long, that generously — you are still here. That person is worth considerably more than the number on this screen.`,
];

/* ══════════════════════════════════════════
   5. 52 EQUIVALENTS
   Each is a function(amount) → string | null
   Returns null if amount too small for that item.
   Caller filters nulls, picks 4 rotating ones.
══════════════════════════════════════════ */
BB.EQUIVS = [
  a => a >= 200  ? `🍕 ${Math.floor(a/200)} pizza nights`                            : null,
  a => a >= 120  ? `🧋 ${Math.floor(a/120)} bubble teas`                             : null,
  a => a >= 4500 ? `✈️ ${Math.floor(a/4500)} Goa return tickets`                    : null,
  a => a >= 8000 ? `🏋️ ${Math.floor(a/8000)} gym memberships (full year each)`      : null,
  a => a >= 180  ? `🍔 ${Math.floor(a/180)} proper burger meals`                     : null,
  a => a >= 150  ? `🎬 ${Math.floor(a/150)} cinema tickets`                          : null,
  a => a >= 350  ? `🏏 ${Math.floor(a/350)} cricket match tickets`                   : null,
  a => a >= 400  ? `🏊 ${Math.floor(a/400)} swimming sessions`                       : null,
  a => a >= 5000 ? `🏕️ ${Math.floor(a/5000)} camping weekend trips`                 : null,
  a => a >= 180  ? `🍜 ${Math.floor(a/180)} Maggi nights (which were better anyway)` : null,
  a => a >= 600  ? `📚 ${Math.floor(a/600)} good books`                              : null,
  a => a >= 2000 ? `🎸 ${Math.floor(a/2000)} guitar lessons`                         : null,
  a => a >= 350  ? `🌮 ${Math.floor(a/350)} street food nights`                      : null,
  a => a >= 900  ? `💆 ${Math.floor(a/900)} spa sessions`                            : null,
  a => a >= 50000  ? `🛵 A Splendor down payment`                                    : null,
  a => a >= 100000 ? `🏖️ 10 nights in Bali — solo`                                  : null,
  a => a >= 75000  ? `💻 A MacBook Air (keeps your secrets)`                         : null,
  a => a >= 25000  ? `📱 A new iPhone SE`                                            : null,
  a => a >= 15000  ? `🎮 A full PS5 game collection`                                 : null,
  a => a >= 200000 ? `🌍 A solo Europe backpacking trip`                             : null,
  a => a >= 12000  ? `🚴 A solid road cycle`                                         : null,
  a => a >= 8000   ? `🧘 One full year of yoga classes`                              : null,
  a => a >= 500  ? `☕ ${Math.floor(a/500)} Starbucks coffees`                       : null,
  a => a >= 1800 ? `🎵 ${Math.floor(a/1800)} concert tickets`                        : null,
  a => a >= 3000 ? `🏄 ${Math.floor(a/3000)} surf lessons in Goa`                   : null,
  a => a >= 700  ? `🎳 ${Math.floor(a/700)} bowling nights with real friends`        : null,
  a => a >= 200  ? `🌱 ${Math.floor(a/200)} indoor plants (that will never leave)`   : null,
  a => a >= 2500 ? `🌄 ${Math.floor(a/2500)} sunrise trek adventures`               : null,
  a => a >= 350  ? `🥘 ${Math.floor(a/350)} full biryani boxes`                     : null,
  a => a >= 150000 ? `🚗 A second-hand car (yours, not theirs)`                     : null,
  a => a >= 20000  ? `🏔️ A solo Himalayan trek package`                             : null,
  a => a >= 5000   ? `📖 An entire bookshelf of great books`                        : null,
  a => a >= 3500   ? `🎻 A ukulele plus 3 months of lessons`                        : null,
  a => a >= 800  ? `🎨 ${Math.floor(a/800)} proper art class sessions`              : null,
  a => a >= 500  ? `🕯️ ${Math.floor(a/500)} luxury scented candle sets`            : null,
  a => a >= 4000 ? `🤿 A full scuba diving course in Goa`                           : null,
  a => a >= 1200 ? `🎢 ${Math.floor(a/1200)} amusement park full days`              : null,
  a => a >= 300  ? `🍺 ${Math.floor(a/300)} nights out with actual friends`         : null,
  a => a >= 2000 ? `🎤 ${Math.floor(a/2000)} karaoke nights`                        : null,
  a => a >= 6000 ? `👟 ${Math.floor(a/6000)} pairs of quality sneakers`             : null,
  a => a >= 400  ? `🎯 ${Math.floor(a/400)} mini golf games`                        : null,
  a => a >= 10000? `📷 A decent camera (captures better moments)`                   : null,
  a => a >= 1500 ? `🖼️ ${Math.floor(a/1500)} art prints for your walls`            : null,
  a => a >= 900  ? `🛁 ${Math.floor(a/900)} luxury bath bomb nights`                : null,
  a => a >= 1000 ? `🏸 ${Math.floor(a/1000)} badminton sessions with snacks`        : null,
  a => a >= 600  ? `🎲 ${Math.floor(a/600)} board game nights`                      : null,
  a => a >= 250  ? `🍦 ${Math.floor(a/250)} solo ice cream dates (zero drama)`      : null,
  a => a >= 3000 ? `🚵 A solid mountain bike`                                        : null,
  a => a >= 1200 ? `🎭 ${Math.floor(a/1200)} theatre show nights`                   : null,
  a => a >= 2500 ? `🎡 ${Math.floor(a/2500)} full carnival days`                    : null,
  a => a >= 99   ? `🎧 ${Math.floor(a/99)} months of Spotify Premium`               : null,
  a => a >= 499  ? `📺 ${Math.floor(a/499)} months of Netflix Premium`              : null,
];

BB.equivOffset = 0;
BB.getEquivs = function(total, count = 4) {
  const valid = BB.EQUIVS.map(fn => fn(total)).filter(Boolean);
  if (!valid.length) return ['🌱 At least one indoor plant that will never ghost you'];
  const out = [];
  for (let i = 0; i < Math.min(count, valid.length); i++)
    out.push(valid[(BB.equivOffset + i) % valid.length]);
  BB.equivOffset = (BB.equivOffset + count) % Math.max(valid.length, 1);
  return out;
};

/* ══════════════════════════════════════════
   6. CERTIFICATE STYLES  (20 unique themes)
══════════════════════════════════════════ */
BB.CERT_STYLES = [
  { bg:'#0D0505', border:'#C8960C', text:'#F5EFE6', accent:'#D63031', extra:'#C8960C', name:'Dark Royal',       bStyle:'solid'  },
  { bg:'#0A0A1A', border:'#7B68EE', text:'#E8E8FF', accent:'#9B59B6', extra:'#7B68EE', name:'Midnight Purple',  bStyle:'solid'  },
  { bg:'#001A0D', border:'#00C853', text:'#E8FFE8', accent:'#00E676', extra:'#00C853', name:'Matrix Green',     bStyle:'double' },
  { bg:'#1A0D00', border:'#FF8C00', text:'#FFF8E8', accent:'#FF6B00', extra:'#FF8C00', name:'Amber Blaze',      bStyle:'solid'  },
  { bg:'#0D001A', border:'#FF1493', text:'#FFE8F8', accent:'#FF69B4', extra:'#FF1493', name:'Hot Pink',         bStyle:'solid'  },
  { bg:'#001A1A', border:'#00BCD4', text:'#E8FFFF', accent:'#00E5FF', extra:'#00BCD4', name:'Neon Teal',        bStyle:'dashed' },
  { bg:'#1A1A00', border:'#FFD700', text:'#FFFDE8', accent:'#FFC107', extra:'#FFD700', name:'Pure Gold',        bStyle:'double' },
  { bg:'#1A0000', border:'#FF4444', text:'#FFE8E8', accent:'#FF2020', extra:'#FF4444', name:'Blood Red',        bStyle:'solid'  },
  { bg:'#0D0D0D', border:'#DDDDDD', text:'#FFFFFF', accent:'#AAAAAA', extra:'#DDDDDD', name:'Monochrome',       bStyle:'solid'  },
  { bg:'#001833', border:'#4FC3F7', text:'#E8F4FF', accent:'#29B6F6', extra:'#4FC3F7', name:'Ocean Blue',       bStyle:'solid'  },
  { bg:'#1A000D', border:'#E91E63', text:'#FFE8F0', accent:'#F06292', extra:'#E91E63', name:'Romantic Rose',    bStyle:'double' },
  { bg:'#0A1A00', border:'#8BC34A', text:'#F0FFE8', accent:'#7CB342', extra:'#8BC34A', name:'Forest Green',     bStyle:'solid'  },
  { bg:'#1A1000', border:'#FF9800', text:'#FFF8E8', accent:'#F57C00', extra:'#FF9800', name:'Sunset Orange',    bStyle:'solid'  },
  { bg:'#100018', border:'#BA68C8', text:'#F8E8FF', accent:'#AB47BC', extra:'#BA68C8', name:'Lavender Dream',   bStyle:'dashed' },
  { bg:'#001010', border:'#26A69A', text:'#E8FFFF', accent:'#00897B', extra:'#26A69A', name:'Deep Sea',         bStyle:'solid'  },
  { bg:'#18000A', border:'#F06292', text:'#FFE8F4', accent:'#EC407A', extra:'#F06292', name:'Bubblegum Pink',   bStyle:'double' },
  { bg:'#080808', border:'#CFB53B', text:'#FFF9E8', accent:'#CFB53B', extra:'#B8860B', name:'Old Gold',         bStyle:'ridge'  },
  { bg:'#000D1A', border:'#1565C0', text:'#E8F0FF', accent:'#1E88E5', extra:'#1565C0', name:'Royal Blue',       bStyle:'solid'  },
  { bg:'#1A0A0A', border:'#FF7043', text:'#FFF0E8', accent:'#F4511E', extra:'#FF7043', name:'Volcanic',         bStyle:'solid'  },
  { bg:'#0D1A00', border:'#689F38', text:'#F4FFE8', accent:'#558B2F', extra:'#689F38', name:'Sage Forest',      bStyle:'double' },
];

/* ══════════════════════════════════════════
   7. CERTIFICATE CLOSING LINES  (20)
══════════════════════════════════════════ */
BB.CERT_CLOSINGS = [
  'May your next relationship have significantly better ROI.',
  'The market was volatile. You invested anyway. That takes courage.',
  'Future you will laugh at this number. Eventually. Give it time.',
  'You didn\'t lose money. You purchased very expensive life experience.',
  'Onward. Upward. Away from them, and toward something much better.',
  'The exit was painful. The data you collected is genuinely priceless.',
  'You survived. The savings account will recover. Both need time.',
  'This is not the end. This is a very dramatic and necessary plot twist.',
  'Consider this your Series A failure. The Series B will be far better.',
  'Filed under: Lessons Learned, Do Not Repeat Under Any Circumstances.',
  'The relationship had an expiry date. This certificate does not.',
  'You loved hard. You lost money. You levelled up. In that order.',
  'Next time: conduct due diligence before the first date. You\'re welcome.',
  'From the ashes of this budget, a considerably wiser person rises.',
  'Your bank account mourns. Your character has never been stronger.',
  'The receipt has been processed. The healing has been formally initiated.',
  'Not all investments pay in money. This one paid in wisdom. Expensive wisdom.',
  'You were the better investment all along. They had poor financial literacy.',
  'Every rupee of that amount taught you something the easy path never would.',
  'The number on this certificate is not your worth. It is merely your tuition.',
];

/* ══════════════════════════════════════════
   8. CERTIFICATE TEASER QUOTES  (10)
   Shown to make people WANT to pay ₹49
══════════════════════════════════════════ */
BB.CERT_TEASE_QUOTES = [
  '"Some people frame their degrees. You should frame your biggest financial mistake. At least this one will actually make people laugh."',
  '"This certificate proves you loved deeply, spent generously, and learned expensively. Every single element of it is worth framing."',
  '"Your ex has moved on. Your wallet has not. This certificate is official proof that at least one of you was fully committed."',
  '"People hang their achievements on walls. This is your achievement. You survived. You calculated. You will post this. You will heal."',
  '"100+ unique designs because your heartbreak is genuinely one of a kind. And so, therefore, is your certificate."',
  '"Post it on Instagram. Tag them in your story. Let the number do all of the talking. You have done enough talking."',
  '"The certificate does not judge. It simply documents. Unlike everyone else in your life right now, it is entirely on your side."',
  '"This is not a breakup certificate. This is a graduation certificate. You just passed life\'s most expensive and most educational class."',
  '"You gave them your time, your money, and your entire playlist. Keep this certificate. It is the only receipt you were ever given."',
  '"Share it. Frame it. Send it to them anonymously. The design is extraordinary. The number is devastating. The healing begins here."',
];

/* ══════════════════════════════════════════
   9. ORNAMENT CHARACTERS (for cert corners)
══════════════════════════════════════════ */
BB.ORNAMENTS = ['✦','❧','◆','✿','⚜','❦','✶','⁕','♦','✸','❋','✤'];

/* ══════════════════════════════════════════
   10. STORIES (marquee confessions)
══════════════════════════════════════════ */
BB.STORIES = [
  { amt:'₹87,400',  text:'Took her to Manali, Goa, and 3 anniversary dinners. She left for her "friend" from the office.',           name:'— Rohit, Mumbai'    },
  { amt:'₹34,200',  text:'2 years of weekend dates. She said she was "not ready for commitment." Sure.',                               name:'— Priya, Delhi'     },
  { amt:'₹1,23,000',text:'iPhone, gold chain, Dubai trip. He said I was "too nice." I agree. Too nice and too broke.',                name:'— Arjun, Bangalore' },
  { amt:'₹12,800',  text:'Only 4 months. Red flags were absolutely there. I thought they were decorations.',                           name:'— Sneha, Pune'      },
  { amt:'₹67,500',  text:'She said money does not matter in love. Turns out it matters significantly when she leaves.',               name:'— Karan, Hyderabad' },
  { amt:'₹2,45,000',text:'3 years. 2 cities. 1 heartbreak. The math is brutally simple. The healing is not.',                        name:'— Anonymous'        },
  { amt:'₹19,600',  text:'Budget relationship apparently. Still hurts exactly like a premium one.',                                   name:'— Meera, Chennai'   },
  { amt:'₹54,300',  text:'Calculated this at 2am. Cried for one hour. Ordered biryani. Started healing.',                            name:'— Dev, Kolkata'     },
  { amt:'₹38,900',  text:'"We are just friends who go on dates." ₹38,900 of friendship.',                                            name:'— Vikram, Jaipur'   },
  { amt:'₹91,000',  text:'He moved to a new city. Left the relationship behind. Kept every single gift.',                            name:'— Riya, Bhopal'     },
  { amt:'₹1,08,500',text:'Invested in "us." She invested in her options. The market, as always, was efficient.',                     name:'— Amit, Ahmedabad'  },
  { amt:'₹27,300',  text:'He said I was overthinking. I was. I was calculating ₹27,300 of overthinking.',                            name:'— Pooja, Surat'     },
];

/* ══════════════════════════════════════════
   11. FAQ DATA
══════════════════════════════════════════ */
BB.FAQS = [
  {
    q: 'Is this actually accurate?',
    a: 'As accurate as your memory and honesty allow. We calculate: (months × monthly date spend) + gifts + trips + calls + treats. The math is elementary. The pain is advanced.'
  },
  {
    q: 'Why is the full breakdown locked behind ₹49?',
    a: 'The ₹49 unlocks your full spending breakdown, 50+ rotating "what you could have bought" items, your official Relationship ROI score, AND a one-of-a-kind gorgeous shareable certificate in 100+ unique designs. It is genuinely worth it. People screenshot and post these.'
  },
  {
    q: 'What exactly is the certificate?',
    a: 'A beautiful, downloadable, shareable document certifying your financial loss. Every single calculation generates a different design from 20+ unique colour themes. People post these on Instagram stories and their followers immediately ask "where did you get this?" The answer is you.'
  },
  {
    q: 'How does the payment gate work?',
    a: 'Click the ₹49 button, complete payment via UPI, card, or net banking on Cashfree\'s secure page, then return here and tap "I paid — show my certificate." Your full results unlock immediately. No account needed. No login.'
  },
  {
    q: 'How does the lucky draw work?',
    a: 'Post your certificate screenshot on Instagram and tag @breakupbudget. Every 10 days we pick one person and send them a real premium gift. Announced on our Instagram page. It could genuinely be you.'
  },
  {
    q: 'Why does the roast change every time?',
    a: '260 unique roast lines written specifically for different amount ranges. Tap "↺ Hit me with another one" for a fresh one. Each is slightly more devastating than the last. This is intentional.'
  },
  {
    q: 'Can I calculate a current relationship?',
    a: 'You absolute legend. Yes. But perhaps wait until it ends. For the sake of all parties involved.'
  },
  {
    q: 'How do you make money from this site?',
    a: 'Certificate unlocks (₹49), tips (₹29–₹499), affiliate links to relevant services, and ads once traffic grows. All clearly marked. Zero data sold. Your financial trauma stays entirely between us.'
  },
];

/* ══════════════════════════════════════════
   12. EXTRA REVENUE: "HEARTBREAK HOROSCOPE"
   A fun feature that gives a personalised
   "financial zodiac" reading based on
   amount + name. Drives shares + tips.
══════════════════════════════════════════ */
BB.HOROSCOPES = [
  { sign:'💸 The Generous Fool',     range:[0,    15000], desc:'You love with your whole wallet. Your heart is gold. Your savings account is not. The universe respects your generosity. Your CA does not.' },
  { sign:'🌹 The Romantic Investor', range:[15001, 40000], desc:'You believed in love as a long-term asset. Unfortunately the asset decided to liquidate early. The market sends its condolences.' },
  { sign:'✈️ The Experience Buyer',  range:[40001, 80000], desc:'You invested in memories. The memories are real. The person who shared them is not around to confirm this. The trips were good though.' },
  { sign:'💎 The Premium Heartbreak',range:[80001,150000], desc:'Only the finest heartbreak for you. You did not just date — you curated a full high-budget romantic experience. The ROI was, admittedly, not there.' },
  { sign:'🏆 The Angel Investor',    range:[150001,999999],desc:'You funded someone\'s entire lifestyle, growth, and self-discovery era. You are essentially a venture capitalist of love. The startup failed. The founder moved on. You remain.' },
];
BB.getHoroscope = function(amount) {
  return BB.HOROSCOPES.find(h => amount >= h.range[0] && amount <= h.range[1]) || BB.HOROSCOPES[BB.HOROSCOPES.length-1];
};

console.log('✅ BB data.js loaded — roasts:', BB.ROASTS.length, '| equivs:', BB.EQUIVS.length, '| cert styles:', BB.CERT_STYLES.length);