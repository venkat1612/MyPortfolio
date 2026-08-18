import { skillLayers } from '../data/portfolio'

/* Infinite ticker of the stack. The list is rendered twice so the -50%
 * translate loops seamlessly. */
export default function Marquee() {
  const techs = skillLayers.flatMap((l) => l.items.map((i) => i.name))
  const loop = [...techs, ...techs]

  return (
    <div className="relative border-y border-line/10 py-5" aria-hidden="true">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {loop.map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-8">
              <span className="font-mono text-sm text-faint transition-colors hover:text-brand">
                {t}
              </span>
              <span className="h-1 w-1 rounded-full bg-brand/40" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
