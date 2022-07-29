# これで生成すると0は名前が数字判定、タグの分余計な改行が入るので適宜調整

import itertools


def character_name_from_count(count):
    JAPANESE_NAME = ['0', 'イチ', 'に', '三', 'ヨン', 'ご', '六', 'ナナ', 'はち', '九', '拾']
    if count > 10:
        return f'{JAPANESE_NAME[10]}{JAPANESE_NAME[count % 10]}'
    return JAPANESE_NAME[count]


def character_str(count, tags):
    name = character_name_from_count(count)
    printing_tags = '\n'.join([f'    - {tag}' for tag in tags])
    return f'- name: {name}\n  tags:\n{printing_tags}'


SET_TAGS = ['Usa', 'コザ', 'さいたま', '津']
count = 0
# タグの組み合わせを全パターン出す
for len_count in range(len(SET_TAGS) + 1):
    for tags in itertools.combinations(SET_TAGS, len_count):
        print(character_str(count, tags))
        count += 1
