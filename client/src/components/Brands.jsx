/* eslint-disable jsx-a11y/alt-text */
export function Brands(props) {
    const { brands } = props;
    console.log(brands);
    return (
        <>
            <div className="brands-section-container">
                {brands?.map((brand) => {
                    return (
                        <div className="brand-item ">
                            <img
                                src={brand.image.secure_url}
                                className="brand-image img-fluid"
                            ></img>
                            <h5 className="brand-title">{brand.name}</h5>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
