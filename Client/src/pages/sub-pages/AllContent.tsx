import { useContent } from '../../hooks/useContent'
import { Card } from '../../components/Card'

export function AllContent() {
    const { contents } = useContent()

    return (
      <>
        <h1 className="text-xl font-bold">📁 All Content</h1>
        <div className='flex flex-wrap gap-10 '>
          {contents.map(({ type, link, title, description }) => (
            <Card
              type={type}
              link={link}
              title={title}
              description={description}
            />
          ))}
        </div>
      </>
    );
}