import styled from 'styled-components'

export function Bio() {
  return (
    // 这个组件放在文章详情页底部，作用是补一小段作者信息。
    <BioSection>
      <Avatar
        src="/assets/profile-avatar.webp"
        alt="sanwenyukaochi avatar"
        width="100"
        height="100"
      />
      <BioText>
        Hi，我是 <strong>sanwenyukaochi</strong>。写 Java 的后端程序员，但总忍不住想看看前端的世界长什么样。用
        React 和 TypeScript 写些小玩意，然后在这里记下“原来前端也有这么多坑”的感悟。
      </BioText>
    </BioSection>
  )
}

// 外层容器负责头像和文字的横向排布。
const BioSection = styled.section`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`

// 作者头像本身的尺寸和圆角都固定在这里，避免每次使用时重复写，小屏时隐藏。
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  display: block;
  margin-right: 20px;

  @media (max-width: 520px) {
    display: none;
  }
`

// Bio 正文单独提一点字号，让它和普通段落区分开。
const BioText = styled.p`
  font-size: 1.125rem;
`
