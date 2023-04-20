import React from 'react';
import { useQuery } from '@/hooks';
import { Visible, TypoNotoSans, FlexRow, FlexColumn } from '@/layouts';
import { CategoryIcon } from '@/icons';
import { distanceFormat, splitByValue } from '@/utils';
import styles from '@/styles/Search.module.css';

type Props = {
  value: string;
  searchResult: kakao.maps.services.PlacesSearchResult;
  handleClickResult: (selectedSearchResult: kakao.maps.services.PlacesSearchResultItem) => void;
};

const SearchResultBox = ({ value, searchResult, handleClickResult }: Props) => {
  const { isSearch, toggleSearch } = useQuery();

  return (
    <Visible visible={isSearch} className={styles.search_result}>
      <div>
        <ul className={styles.search_result__ul}>
          {searchResult.map((item) => (
            <li
              key={`result-li-${item.id}`}
              className={styles.search_result__li}
              onClick={() => {
                toggleSearch();
                handleClickResult(item);
              }}
            >
              <FlexRow alignItems='center' gap='15px'>
                <FlexColumn alignItems='center' width='30px'>
                  <CategoryIcon category={item.category_group_name} />
                  <TypoNotoSans
                    text={distanceFormat(parseInt(item.distance))}
                    variant='caption'
                    color='rgba(var(--caption-foreground-rgba))'
                    sx={{ transform: 'scale(0.7)' }}
                  />
                </FlexColumn>
                <FlexColumn>
                  <div>
                    {splitByValue(item.place_name, value).map((word, index) => (
                      <TypoNotoSans
                        key={`result-place-${word}-${index}`}
                        text={word}
                        component='span'
                        fontSize='0.9rem'
                        color={word.toLowerCase() === value.toLowerCase() ? 'blue' : ''}
                      />
                    ))}
                  </div>
                  <TypoNotoSans
                    text={item.road_address_name.length > 0 ? item.road_address_name : item.address_name}
                    variant='caption'
                    color='rgba(var(--secondary-foreground-rgba))'
                    paddingLeft='1px'
                  />
                </FlexColumn>
              </FlexRow>
            </li>
          ))}
        </ul>
      </div>
    </Visible>
  );
};

export default SearchResultBox;