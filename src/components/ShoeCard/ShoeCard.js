import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const VARIANT = {
  default: {
    "--padding": `none`,
  },
  "on-sale": {
    "--backgroundColor": `${COLORS.primary}`,
    "--padding": `8px 10px`,
  },
  "new-release": {
    "--backgroundColor": `${COLORS.secondary}`,
    "--padding": `8px 10px`,
  },
};

const Tag = styled.div`
  color: ${COLORS.white};
  padding: var(--padding);
  background-color: var(--backgroundColor);
  font-weight: 700;

  position: absolute;
  top: 12px;
  right: -4px;
`;

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore

  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const tag =
    variant === "on-sale"
      ? "Sale"
      : variant === "new-release"
      ? "Just released!"
      : null;

  const discountedPrice = salePrice ? formatPrice(salePrice) : null;

  const styles = VARIANT[variant];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Tag style={styles}>{tag}</Tag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{ textDecoration: salePrice ? "line-through" : "initial" }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          <SalePrice>{discountedPrice}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;

  flex: 1 1 340px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Row = styled.div`
  font-size: 1rem;

  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
