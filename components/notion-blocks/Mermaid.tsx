import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import useTheme from '@/lib/theme'
import { getTextContent } from 'notion-utils'
import { NotionBlock } from '@/types'

interface MermaidProps {
  block: NotionBlock;
}

export default function Mermaid({ block }: MermaidProps) {
  const { dark } = useTheme()

  useEffect(() => {
    mermaid.initialize({ theme: dark ? 'dark' : 'neutral' })
  }, [dark])

  const source = getTextContent(block.properties?.title)
  const container = useRef<HTMLDivElement>(null)
  const [svg, setSVG] = useState<string>('')

  useEffect(() => {
    if (container.current) {
      mermaid.render(`mermaid-${block.id}`, source, container.current)
        .then(({ svg }) => setSVG(svg))
    }
  }, [block, source])

  return (
    <div
      ref={container}
      className="w-full leading-normal flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
