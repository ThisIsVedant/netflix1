import dynamic from "next/dynamic";

const Layout = dynamic(import('../components/Layout'));

export default function Search() {
    return (
        // eslint-disable-next-line react/no-children-prop
        <Layout children={undefined}>
            
        </Layout>
    )
}