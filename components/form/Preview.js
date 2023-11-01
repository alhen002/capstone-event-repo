import styled from "styled-components";
import getDate from "../../lib/getDate";
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.75rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 36rem;
`;

const StyledLabel = styled.p`
  color: var(--text-accent);
  font-size: 1rem;
  font-family: inherit;
  font-style: normal;
  font-weight: 500;
  margin-top: 1rem;
`;

const StyledParagraph = styled.p`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  color: var(--primary);
  border: 1px solid var(--primary);
  background-color: var(--background);
  width: 100%;
`

export default function Preview({allData}){
    const {dateString: startDateString} = getDate(allData?.startDateTime)
    const {dateString: endDateString} = getDate(allData?.endDateTime)


    return (
        <StyledContainer>
         <StyledLabel>Title</StyledLabel>
                <StyledParagraph>{allData.title}</StyledParagraph>
    <StyledLabel>Description</StyledLabel>
    <StyledParagraph>{allData.description}</StyledParagraph>
    <StyledLabel>Postal Code</StyledLabel>
    <StyledParagraph>{allData.postalCode}</StyledParagraph>
    <StyledLabel>City</StyledLabel>
    <StyledParagraph>{allData.city}</StyledParagraph>
    <StyledLabel>Address</StyledLabel>
    <StyledParagraph>{allData.address}</StyledParagraph>
    <StyledLabel>Start Date</StyledLabel>
    <StyledParagraph>{startDateString}</StyledParagraph>
    <StyledLabel>End Date</StyledLabel>
    <StyledParagraph>{endDateString}</StyledParagraph>
        </StyledContainer>
    )
}