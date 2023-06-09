import styled from "styled-components"


/*
 * Стили компонента ImageGallery
 */

 const Grid = styled.ul`
  display: grid;
  max-width: calc(100vw - 4px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin: 10px auto 0;
  padding: 0;
  list-style: none;
`
export default Grid


