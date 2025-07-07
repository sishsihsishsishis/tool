import pandas as pd
import json

# 定义jsonl文件路径
jsonl_file = '/Users/hoy/Downloads/trainv2.jsonl'
# 定义输出Excel文件路径
excel_file = '/Users/hoy/Downloads/trainv2.xlsx'

# 读取jsonl文件
with open(jsonl_file, 'r', encoding='utf-8') as file:
    lines = file.readlines()

# 解析jsonl数据
data = [json.loads(line) for line in lines]

# 将数据加载到DataFrame中
df = pd.DataFrame(data)

# 将DataFrame写入Excel文件
df.to_excel(excel_file, index=False)

print(f"JSONL file has been successfully converted to {excel_file}")