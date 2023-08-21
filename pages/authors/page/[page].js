import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/thq-react-components'
import PropTypes from 'prop-types'

import authorsPageInitialPathsE5e14Resource from '../../../resources/authors-page-initial-paths-e5e14'
import authorsPageInitialProps9ac22Resource from '../../../resources/authors-page-initial-props-9ac22'

const Authors11 = (props) => {
  return (
    <>
      <div className="authors11-container">
        <Head>
          <title>Authors1 - Dynamic Optimization Developer</title>
          <meta
            property="og:title"
            content="Authors1 - Dynamic Optimization Developer"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(AuthorsEntities) => (
                  <>
                    <div className="authors11-container1">
                      <h1>{AuthorsEntities?.name}</h1>
                      <span>{AuthorsEntities?.name}</span>
                      <span>{AuthorsEntities?.id}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.authorsEntities}
          persistDataDuringLoading={true}
          key={props.page}
        />
      </div>
      <style jsx>
        {`
          .authors11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .authors11-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Authors11.defaultProps = {
  authorsEntities: [],
}

Authors11.propTypes = {
  authorsEntities: PropTypes.array,
}

export default Authors11

export async function getStaticPaths() {
  const response = await authorsPageInitialPathsE5e14Resource({})
  const totalCount = response?.meta?.pagination?.total
  const pagesCount = Math.ceil(totalCount / 10)
  return {
    paths: Array.from(
      {
        length: pagesCount,
      },
      (_, i) => ({
        params: {
          page: (i + 1).toString(),
        },
      })
    ),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const response = await authorsPageInitialProps9ac22Resource({
    ...context?.params,
    start: (context.params.page - 1) * 10,
  })
  return {
    props: {
      authorsEntities: response?.data,
      ...response?.meta?.pagination,
    },
    revalidate: 60,
  }
}
