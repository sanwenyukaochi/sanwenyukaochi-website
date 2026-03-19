import styled from 'styled-components'

export function Bio() {
  return (
    <BioSection>
      <Avatar
        src="/assets/profile-pic.webp"
        alt="sanwenyukaochi avatar"
        width="100"
        height="100"
      />
      <BioText>
        Hi, I&apos;m <strong>sanwenyukaochi</strong>. I build personal experiments with
        React, Next.js, TypeScript and Python, and I use this blog to record what I
        learn while shipping things.
      </BioText>
    </BioSection>
  )
}

const BioSection = styled.section`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

const BioText = styled.p`
  font-size: 1.1rem;
`
