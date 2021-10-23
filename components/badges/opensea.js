import Link from 'next/link'
import { collectionName } from '../../config'
export default function OpenseaBadge() {
    return (
      <div className="flex justify-center p-4">
        <Link
          href={`https://opensea.io/collection/${collectionName}`}
          title="Buy on OpenSea"
          target="_blank"
        >
          <img style={{
              width: "220px",
              borderRadius: "5px",
              boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.25)"
            }}
            className="flex justify-center cursor-pointer"
            src="https://storage.googleapis.com/opensea-static/Logomark/Badge%20-%20Available%20On%20-%20BW.png"
            alt="Available on OpenSea"
          />
        </Link>
      </div>
    )
}
