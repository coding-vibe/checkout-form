export default function withFormHandler = (screen) => (Component) => (props) => {
    const handleSubmit = (values) => {
    };

    return (
        <>
            <Component initialValue onSubmit={handleSubmit} />
            <Button>Submit</Button>
        </>
    );
};
