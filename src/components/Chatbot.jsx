import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, ArrowDown } from 'lucide-react'
import {
  knowledgeBase, starterQuestions, chatbotIntro,
  fallbackAnswer, MATCH_THRESHOLD,
} from '../data/chatbot'
import { springy } from '../lib/motion'

/* ---------------------------------------------------------------------------
 * Scripted assistant — no AI, no API key, no per-message cost.
 *
 * Matching: the question is scored against every topic's keywords. Longer
 * keyword hits score higher than short ones, so "spring boot" outranks an
 * incidental "boot". Below MATCH_THRESHOLD we route to the contact form
 * rather than guessing.
 * ------------------------------------------------------------------------- */
function findAnswer(input) {
  const q = input.toLowerCase().trim()
  if (!q) return null

  let best = null
  let bestScore = 0

  for (const topic of knowledgeBase) {
    let score = 0
    for (const kw of topic.keywords) {
      if (q.includes(kw)) {
        // Weight by keyword length — a longer phrase match is stronger evidence.
        score += kw.length > 6 ? 2 : 1
      }
    }
    if (score > bestScore) {
      bestScore = score
      best = topic
    }
  }

  return bestScore >= MATCH_THRESHOLD ? best : null
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: chatbotIntro.greeting },
  ])
  const [showStarters, setShowStarters] = useState(true)

  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  // Keep the latest message in view. Deferred to the next frame — scrollHeight
  // is stale until the new bubble has actually painted, which truncates long
  // answers if you scroll immediately.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const id = requestAnimationFrame(() =>
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }),
    )
    return () => cancelAnimationFrame(id)
  }, [messages, typing])

  // Focus the field when the panel opens.
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 260)
  }, [open])

  // Escape closes.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = useCallback((raw) => {
    const text = (raw ?? '').trim()
    if (!text) return

    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setShowStarters(false)
    setTyping(true)

    // Small delay so the reply doesn't appear instantaneously — reads as
    // considered rather than canned.
    setTimeout(() => {
      const hit = findAnswer(text)
      setTyping(false)
      setMessages((m) => [
        ...m,
        hit
          ? { from: 'bot', text: hit.answer }
          : { from: 'bot', text: fallbackAnswer, cta: true },
      ])
    }, 480)
  }, [])

  const onSubmit = (e) => { e.preventDefault(); send(input) }

  return (
    <>
      {/* ---------- Launcher ---------- */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat — ask about my experience'}
        aria-expanded={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={springy}
        className="fixed bottom-5 right-5 z-[81] grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl sm:bottom-6 sm:right-6"
        style={{
          background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))',
          boxShadow: '0 14px 34px -10px rgb(var(--brand) / .8)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>

        {/* Attention pulse, only while closed */}
        {!open && (
          <span className="pointer-events-none absolute inset-0 rounded-full">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand/50" />
          </span>
        )}
      </motion.button>

      {/* ---------- Panel ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Chat assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[80] flex h-[min(30rem,70vh)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl shadow-2xl sm:right-6 sm:w-[23rem]"
            style={{
              background: 'rgb(var(--surface))',
              border: '1px solid rgb(var(--line) / .12)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 text-white"
              style={{ background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))' }}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 font-mono text-xs font-bold">
                VK
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold leading-tight">Ask about Venkata</span>
                <span className="block text-[11px] text-white/75">{chatbotIntro.note}</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto p-4"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.from === 'user'
                        ? 'rounded-br-md text-white'
                        : 'rounded-bl-md text-txt'
                    }`}
                    style={
                      m.from === 'user'
                        ? { background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))' }
                        : { background: 'rgb(var(--line) / .06)' }
                    }
                  >
                    {m.text}
                    {m.cta && (
                      <a
                        href="#contact"
                        onClick={() => setOpen(false)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-white"
                        style={{ background: 'rgb(var(--brand))' }}
                      >
                        <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                        Go to contact form
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md px-4 py-3" style={{ background: 'rgb(var(--line) / .06)' }}>
                    <span className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          animate={{ opacity: [0.25, 1, 0.25] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                          className="h-1.5 w-1.5 rounded-full bg-brand"
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}

              {/* Starter chips */}
              {showStarters && (
                <div className="space-y-1.5 pt-1">
                  {starterQuestions.map((q) => (
                    <motion.button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      whileHover={{ x: 3 }}
                      transition={springy}
                      className="block w-full rounded-xl border px-3 py-2 text-left text-[12.5px] text-muted transition-colors hover:text-brand"
                      style={{ borderColor: 'rgb(var(--line) / .12)' }}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t p-3"
              style={{ borderColor: 'rgb(var(--line) / .1)' }}
            >
              <label htmlFor="chat-input" className="sr-only">Ask a question</label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience, stack, availability…"
                autoComplete="off"
                className="min-w-0 flex-1 rounded-xl border bg-transparent px-3 py-2.5 text-[13px] text-txt placeholder:text-faint focus:outline-none"
                style={{ borderColor: 'rgb(var(--line) / .12)' }}
              />
              <motion.button
                type="submit"
                disabled={!input.trim()}
                whileHover={{ scale: input.trim() ? 1.06 : 1 }}
                whileTap={{ scale: 0.94 }}
                transition={springy}
                aria-label="Send question"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white disabled:opacity-40"
                style={{ background: 'linear-gradient(140deg, rgb(var(--brand)), rgb(var(--brand2)))' }}
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
