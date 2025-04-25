// Main React app for the "Kingdom of FapCraft" Minecraft server website

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FapCraftWebsite() {
  const [status, setStatus] = useState({ online: false, players: { online: 0, max: 0 } });
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState('');
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedConsent = localStorage.getItem('cookieConsent');
      if (storedConsent === 'yes') {
        setConsent(true);
      }

      const storedBg = localStorage.getItem('customBackground');
      if (storedBg) setBackground(storedBg);
    }

    fetch('https://api.mcstatus.io/v2/status/java/kingdomoffap.falixsrv.me')
      .then(res => res.json())
      .then(data => {
        setStatus(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const changeBackground = (color) => {
    if (consent && typeof window !== 'undefined') {
      localStorage.setItem('customBackground', color);
    }
    setBackground(color);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xl font-bold animate-pulse"
        >
          🛠️ Booting up FapCraft...
        </motion.div>
      </div>
    );
  }

  if (!consent) {
    return (
      <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">🍪 Cookie Consent</h1>
          <p>We use cookies to save your background preferences. Cool?</p>
          <Button onClick={() => {
            setConsent(true);
            if (typeof window !== 'undefined') {
              localStorage.setItem('cookieConsent', 'yes');
            }
          }}>Yes, use cookies</Button>
        </div>
      </div>
    );
  }

  return (
    <main className="p-4 md:p-10 space-y-6 max-w-4xl mx-auto" style={{ backgroundColor: background || 'transparent' }}>
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center"
      >
        🏰 Welcome to Kingdom of FapCraft
      </motion.h1>

      <div className="text-center">
        <p className="mb-2">🎨 Customize Background</p>
        <div className="flex justify-center gap-2 mb-4">
          <Button onClick={() => changeBackground('#1f1f1f')}>Dark</Button>
          <Button onClick={() => changeBackground('#333366')}>Midnight Blue</Button>
          <Button onClick={() => changeBackground('#000')}>Black</Button>
          <Button onClick={() => changeBackground('')}>Reset</Button>
        </div>
      </div>

      <motion.div className="grid gap-4" initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
        <Card>
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <Flame size={36} className="text-red-500" />
            <div>
              <h2 className="text-xl font-semibold">Server Status</h2>
              <p>
                {status.online ? (
                  <span className="text-green-600">Online — {status.players.online} / {status.players.max} players</span>
                ) : (
                  <span className="text-red-600">Offline</span>
                )}
              </p>
              <p className="text-sm text-gray-500">IP: kingdomoffap.falixsrv.me</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="news" className="w-full">
          <TabsList className="justify-center flex-wrap">
            <TabsTrigger value="news">📰 News</TabsTrigger>
            <TabsTrigger value="rules">📜 Rules</TabsTrigger>
            <TabsTrigger value="lore">🌌 Lore</TabsTrigger>
          </TabsList>
          <TabsContent value="news">
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-xl font-semibold mb-2">Latest Updates</h3>
                  <ul className="list-disc list-inside space-y-1 inline-block text-left">
                    <li>🔥 New PvP Arena added!</li>
                    <li>🎉 Server maintenance completed successfully.</li>
                    <li>🛡️ FapKing crowned after epic 1v1 duel.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="rules">
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-xl font-semibold mb-2">Server Rules</h3>
                  <ul className="list-decimal list-inside space-y-1 inline-block text-left">
                    <li>No griefing, unless it’s consensual 😏</li>
                    <li>Keep it spicy but don’t break the vibe.</li>
                    <li>Respect the mods — they hold the ban hammer.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="lore">
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-xl font-semibold mb-4">🌠 The Divine Pantheon of FapCraft</h3>
                  <div className="text-left max-w-lg mx-auto space-y-3">
                    <h3 className="text-xl font-semibold text-purple-300">🌌 Gods</h3>
                    <div className="text-purple-300">
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">🔥 Andy – The One True God</summary>
                        <p>The supreme deity. Master of all. Magic incarnate. The world is his spellbook.</p>
                      </motion.details>
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">🌀 Kutsu – The Weaver</summary>
                        <p>The god of Lore and Arcane Threads. Malevolent prankster and protector of chaos spells.</p>
                      </motion.details>
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">🌙 Aurora – The Moonlight Guardian</summary>
                        <p>Goddess of Building and Magic. Her temples touch the stars and her spells light the way.</p>
                      </motion.details>
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">🕳️ Umber – The Abyssal Hand</summary>
                        <p>She's Umber. Mysterious, silent, and oddly powerful. Don’t ask. Don’t follow.</p>
                      </motion.details>
                    </div>

                    <h3 className="text-xl font-semibold text-blue-400 mt-6">🧍 Notable Humans</h3>
                    <div className="text-blue-300">
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">👑 Ghepard – The Harem King</summary>
                        <p>Boss of his own domain, master of seduction and silly fights. Wields charm as a weapon.</p>
                      </motion.details>
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">🧱 RandomRook – The Architect</summary>
                        <p>Mythical Builder of the realm. Known to create cathedrals in hours, and vanish after.</p>
                      </motion.details>
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">🤷 Homeless Karl – The Wandering One</summary>
                        <p>He’s just Karl. You’ll know him when you see him. Probably. Maybe.</p>
                      </motion.details>
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">🧠 MegaGauffre – The Thinker</summary>
                        <p>A lesser being by status, yet smarter than many gods. Her intellect is unmatched.</p>
                      </motion.details>
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">🐒 Uranos125 – The Savage Simian</summary>
                        <p>A dangerous monkey creature. Unpredictable and wild. Tame him if you dare.</p>
                      </motion.details>
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">🕵️ Agent – The Short One</summary>
                        <p>Mysterious. Sneaky. Unfortunately named for certain anatomical reasons. 😳</p>
                      </motion.details>
                      <motion.details variants={fadeIn} initial="hidden" animate="visible">
                        <summary className="cursor-pointer font-bold">🌊 Nyr – The Waterborne Siren</summary>
                        <p>Graceful and quiet, Nyr dances through oceans and whispers through tides. She’s calm... until she isn’t.</p>
                      </motion.details>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}
