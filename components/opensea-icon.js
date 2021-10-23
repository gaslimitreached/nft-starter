import Link from 'next/link'
import { collectionName } from '../config'
export default function OpenseaIcon() {
    return (
      <div className="flex justify-center p-8 mb-8">
        <Link
          href={`https://opensea.io/collection/${collectionName}`}
          title="Buy on OpenSea"
          target="_blank"
        >
          Available on OpenSea
        </Link>
      </div>
    )
}
