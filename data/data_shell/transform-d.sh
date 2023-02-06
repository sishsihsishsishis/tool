#!/bin/zsh

#新建临时文件夹
mkdir  ./data/json

#将raw（原始数据）内的所有csv文件通过js库csv-parser处理一遍转成json #https://github.com/mafintosh/csv-parser
# csv:  NAME,AGE            json: [
#       Daffy Duck,24   =>         { NAME: 'Daffy Duck', AGE: '24' },
#       Bugs Bunny,22              { NAME: 'Bugs Bunny', AGE: '22' }
#                                 ]     
for file in `ls ./data/raw` 
do
  if [[ $file =~ .*csv$ ]] then
    node data_shell/csv.js ./data/raw/$file > "./data/json/${file}.json"
  fi
done

# 折线图数据用line.js 脚本处理 line.js file smoothParam 参数含义file：文件路径 smoothParam 平滑参数 （可以不填，不填则不进行平滑处理）
# 数据的平滑处理取平均值 假设smoothParam = 3 ：[0,1,2,3,4,5,...] => [[0,1,2],[3,4,5],...] => [1,4,...] 详见line.js
# 后续可考虑修改为更加适合的平滑算法
node data_shell/line.js ./data/json/a_sync.csv.json > ./data/a_sync.json
node data_shell/line.js ./data/json/a_results.csv.json 8 > ./data/a_results.json
node data_shell/line.js ./data/json/rppg_results.csv.json 500 > ./data/rppg_results.json
node data_shell/line.js ./data/json/rppg_sync.csv.json > ./data/rppg_sync.json
node data_shell/line.js ./data/json/v_results.csv.json 8 > ./data/v_results.json
node data_shell/line.js ./data/json/v_sync.csv.json > ./data/v_sync.json

#删除临时文件夹
rm -r ./data/json

#椭圆图处理
node data_shell/timeline.js ./data/raw/v_results.csv ./data/raw/a_results.csv > ./data/va.json
#NLP数据处理
node data_shell/nlp.js ./data/raw/nlp_results.txt > ./data/nlp_results.json
