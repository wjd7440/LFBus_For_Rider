import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  Alert,
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import { Button } from "./index";
import Icon from "react-native-fontawesome-pro";
import AppStyle from "../constants/style";

const Items = ({ currentPage, startPage, endPage, totalPage, setPage }) => {
  //   console.log(currentPage, startPage, endPage, totalPage, setPage);
  let pageArray = [];
  let pages = [];
  let page = parseInt(currentPage);

  for (var i = startPage; i <= endPage && i <= totalPage; i++) {
    pageArray.push(i);
  }

  pageArray.map((item, index) => {
    pages.push(
      <TouchableOpacity
        key={"pagination" + index}
        onPress={() => {
          setPage(item);
        }}
      >
        <Block
          style={item === page ? styles.pageItemActive : styles.pageItem}
          middle
          center
        >
          <Text
            style={{
              textAlign: "center",
              textAlignVertical: "center",
            }}
            size={16}
            color={i === page ? "#00BA64" : "#999"}
          >
            {item}
          </Text>
        </Block>
      </TouchableOpacity>
    );
  });

  return pages;
};

const Pagination = ({
  totalRecord,
  blockSize,
  pageSize,
  currentPage,
  setPage,
}) => {
  const currentBlock = Math.ceil(currentPage / blockSize);
  const totalPage = Math.ceil(totalRecord / pageSize);
  const totalBlock = Math.ceil(totalPage / blockSize);

  const startPage = (currentBlock - 1) * blockSize + 1;
  const endPage = currentBlock * blockSize;

  const prevBlockPage = startPage - 1;
  const nextBlockPage = endPage + 1;

  return (
    <Block style={styles.pagination}>
      <Block style={styles.pageItemList}>
        {currentBlock === 1 ? (
          <Text> </Text>
        ) : (
          //   <TouchableOpacity style={{ marginRight: 10 }} key={"paginationPrev"}>
          //     <Block style={styles.pagePrev} middle center>
          //       <Icon center name="chevron-left" type="regular" size={24} />
          //     </Block>
          //   </TouchableOpacity>
          <>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              key={"paginationFirst"}
              onPress={() => {
                setPage(1);
              }}
            >
              <Block style={styles.pagePrev} middle center>
                <Icon
                  center
                  name="angle-double-left"
                  type="regular"
                  size={24}
                />
              </Block>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              key={"paginationPrev"}
              onPress={() => {
                setPage(prevBlockPage);
              }}
            >
              <Block style={styles.pagePrev} middle center>
                <Icon center name="angle-left" type="regular" size={24} />
              </Block>
            </TouchableOpacity>
          </>
        )}
        <Items
          currentPage={currentPage}
          startPage={startPage}
          endPage={endPage}
          totalPage={totalPage}
          setPage={setPage}
        />
        {currentBlock === totalBlock ? (
          <Text> </Text>
        ) : (
          //   <TouchableOpacity style={{ marginLeft: 10 }} key={"paginationNext"}>
          //     <Block style={styles.pagePrev} middle center>
          //       <Icon center name="chevron-right" type="regular" size={24} />
          //     </Block>
          //   </TouchableOpacity>
          <>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              key={"paginationNext"}
              onPress={() => {
                setPage(nextBlockPage);
              }}
            >
              <Block style={styles.pageNext} middle center>
                <Icon center name="angle-right" type="regular" size={24} />
              </Block>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              key={"paginationLast"}
              onPress={() => {
                setPage(totalPage);
              }}
            >
              <Block style={styles.pageNext} middle center>
                <Icon
                  center
                  name="angle-double-right"
                  type="regular"
                  size={24}
                />
              </Block>
            </TouchableOpacity>
          </>
        )}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  ...AppStyle,
});

export default Pagination;
